import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }

  // REGISTER
  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        role: 'USER'
      }
    });

    return this.generateToken(user.id, user.email, user.role);
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user.id, user.email, user.role);
  }

  // LOGOUT (JWT lưu client, server chỉ trả message)
  async logout(_userId: string) {
    return { message: 'Logged out successfully' };
  }

  // FORGOT PASSWORD
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    if (!user) throw new NotFoundException('User not found');

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: expires
      }
    });

    // TODO: gửi email, hiện tại trả ra để test
    return { resetToken: token };
  }

  // RESET PASSWORD
  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.prisma.passwordResetToken.findFirst({
      where: { token: dto.token }
    });

    if (!record) throw new UnauthorizedException('Invalid token');
    if (record.expiresAt < new Date())
      throw new UnauthorizedException('Token expired');

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: record.userId },
      data: { password: hashed }
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: record.id }
    });

    return { message: 'Password reset successfully' };
  }

  // PRIVATE: tạo JWT
  private async generateToken(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

    return {
      accessToken: token,
      user: { id, email, role }
    };
  }
}
