import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleQueryDto } from './dto/vehicle-query.dto';

@Injectable()
export class VehicleService {
    constructor(
        private prisma: PrismaService,
        private audit: AuditLogService
    ) { }

    async findAll(query: VehicleQueryDto) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { licensePlate: { contains: query.search, mode: 'insensitive' } },
                { brand: { contains: query.search, mode: 'insensitive' } },
                { model: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        if (query.status) where.status = query.status;
        if (query.branchId) where.branchId = query.branchId;
        if (query.categoryId) where.categoryId = query.categoryId;

        const [items, total] = await this.prisma.$transaction([
            this.prisma.vehicle.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: true,
                    branch: true,
                    priceList: true
                }
            }),
            this.prisma.vehicle.count({ where })
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async findOne(id: string) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
            include: {
                category: true,
                branch: true,
                priceList: true,
                maintenances: true,
                bookings: true,
                reviews: true
            }
        });
        if (!vehicle) throw new NotFoundException('Vehicle not found');
        return vehicle;
    }

    async create(dto: CreateVehicleDto, actorId?: string) {
        const exists = await this.prisma.vehicle.findUnique({
            where: { licensePlate: dto.licensePlate }
        });
        if (exists) throw new BadRequestException('License plate already exists');

        const vehicle = await this.prisma.vehicle.create({
            data: {
                ...dto,
                status: dto.status ?? 'AVAILABLE',
                photos: dto.photos ?? []
            }
        });

        await this.audit.log(actorId ?? null, 'CREATE', 'Vehicle', vehicle.id, vehicle);
        return vehicle;
    }

    async update(id: string, dto: UpdateVehicleDto, actorId?: string) {
        const before = await this.findOne(id);

        if (dto.licensePlate && dto.licensePlate !== before.licensePlate) {
            const exists = await this.prisma.vehicle.findUnique({
                where: { licensePlate: dto.licensePlate }
            });
            if (exists) throw new BadRequestException('License plate already exists');
        }

        const vehicle = await this.prisma.vehicle.update({
            where: { id },
            data: {
                ...dto,
                photos: dto.photos ?? before.photos
            }
        });

        await this.audit.log(actorId ?? null, 'UPDATE', 'Vehicle', id, {
            before,
            after: vehicle
        });

        return vehicle;
    }

    async updateStatus(id: string, status: string, actorId?: string) {
        const vehicle = await this.prisma.vehicle.update({
            where: { id },
            data: { status }
        });

        await this.audit.log(actorId ?? null, 'STATUS_UPDATE', 'Vehicle', id, {
            status
        });

        return vehicle;
    }

    async delete(id: string, actorId?: string) {
        await this.audit.log(actorId ?? null, 'DELETE', 'Vehicle', id);
        return this.prisma.vehicle.delete({ where: { id } });
    }
}
