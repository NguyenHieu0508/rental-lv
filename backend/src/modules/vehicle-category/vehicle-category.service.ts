import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class VehicleCategoryService {
    constructor(private prisma: PrismaService) { }

    findAll2() {
        return this.prisma.vehicleCategory.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    create(data: any) {
        return this.prisma.vehicleCategory.create({ data });
    }

    update(id: string, data: any) {
        // Remove fields prisma không cho update
        const { id: _remove, createdAt, updatedAt, ...safeData } = data;

        return this.prisma.vehicleCategory.update({
            where: { id },
            data: safeData,
        });
    }


    delete(id: string) {
        return this.prisma.vehicleCategory.delete({
            where: { id },
        });
    }

    findAll(keyword?: string) {
        return this.prisma.vehicleCategory.findMany({
            where: keyword
                ? {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { code: { contains: keyword, mode: 'insensitive' } },
                    ],
                }
                : {},
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.vehicleCategory.findUnique({ where: { id } });
    }

}
