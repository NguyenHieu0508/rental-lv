import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';

@Module({
    controllers: [ContractController],
    providers: [ContractService, PrismaService, AuditLogService],
    exports: [ContractService]
})
export class ContractModule { }
