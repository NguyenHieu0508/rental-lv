import { Module } from '@nestjs/common';
import { VehicleCategoryService } from './vehicle-category.service';
import { VehicleCategoryController } from './vehicle-category.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
    controllers: [VehicleCategoryController],
    providers: [VehicleCategoryService, PrismaService],
})
export class VehicleCategoryModule { }
