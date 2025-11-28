import { Module } from '@nestjs/common';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
    controllers: [CustomerController],
    providers: [CustomerService, PrismaService, AuditLogService],
    exports: [CustomerService]
})
export class CustomerModule { }
