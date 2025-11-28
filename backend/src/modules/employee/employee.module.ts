import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService, PrismaService, AuditLogService],
    exports: [EmployeeService]
})
export class EmployeeModule { }
