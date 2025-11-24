import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(this.stripPassword);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.stripPassword(user);
  }

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        name: dto.name,
        role: dto.role || 'USER'
      }
    });

    return this.stripPassword(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data
    });

    return this.stripPassword(user);
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return this.stripPassword(user);
  }

  private stripPassword(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
