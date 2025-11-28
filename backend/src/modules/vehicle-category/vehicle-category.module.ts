import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { VehicleCategoryService } from './vehicle-category.service';
import { VehicleCategoryController } from './vehicle-category.controller';

@Module({
    controllers: [VehicleCategoryController],
    providers: [VehicleCategoryService, PrismaService, AuditLogService],
    exports: [VehicleCategoryService]
})
export class VehicleCategoryModule { }
