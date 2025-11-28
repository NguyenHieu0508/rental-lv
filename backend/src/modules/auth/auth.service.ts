import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private audit: AuditLogService
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    if (!user.isActive) {
      throw new UnauthorizedException('User is deactivated');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      await this.audit.log(null, 'LOGIN_FAILED', 'Auth', undefined, {
        email: dto.email
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'change-this-secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

    await this.userService.updateLastLogin(user.id);
    await this.audit.log(user.id, 'LOGIN', 'Auth');

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async register(dto: RegisterDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already exists');

    const user = await this.userService.create({
      email: dto.email,
      password: dto.password,
      name: dto.name
    });

    await this.audit.log(user.id, 'REGISTER', 'Auth', user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }

  async me(user: any) {
    return this.userService.findOne(user.id);
  }
}
