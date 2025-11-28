import { Module } from '@nestjs/common';
import { AuditLogService } from '../audit-log/audit-log.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuditLogService],
  exports: [UserService]
})
export class UserModule { }
