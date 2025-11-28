import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';

@Module({
    controllers: [PriceListController],
    providers: [PriceListService, PrismaService, AuditLogService],
    exports: [PriceListService]
})
export class PriceListModule { }
