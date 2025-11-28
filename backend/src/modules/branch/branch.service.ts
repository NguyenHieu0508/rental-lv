import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchQueryDto } from './dto/branch-query.dto';

@Injectable()
export class BranchService {
    constructor(
        private prisma: PrismaService,
        private audit: AuditLogService
    ) { }

    async findAll(query: BranchQueryDto) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { code: { contains: query.search, mode: 'insensitive' } },
                { city: { contains: query.search, mode: 'insensitive' } },
                { country: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        if (query.isActive !== undefined) {
            where.isActive = query.isActive === 'true';
        }

        const [items, total] = await this.prisma.$transaction([
            this.prisma.branch.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.branch.count({ where })
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
        const branch = await this.prisma.branch.findUnique({
            where: { id },
            include: {
                vehicles: true,
                employees: true,
                bookings: true
            }
        });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    async create(dto: CreateBranchDto, actorId?: string) {
        if (dto.code) {
            const exists = await this.prisma.branch.findUnique({ where: { code: dto.code } });
            if (exists) throw new BadRequestException('Branch code already exists');
        }

        const branch = await this.prisma.branch.create({
            data: dto
        });

        await this.audit.log(actorId ?? null, 'CREATE', 'Branch', branch.id, branch);

        return branch;
    }

    async update(id: string, dto: UpdateBranchDto, actorId?: string) {
        const before = await this.findOne(id);

        if (dto.code && dto.code !== before.code) {
            const exists = await this.prisma.branch.findUnique({ where: { code: dto.code } });
            if (exists) throw new BadRequestException('Branch code already exists');
        }

        const branch = await this.prisma.branch.update({
            where: { id },
            data: dto
        });

        await this.audit.log(actorId ?? null, 'UPDATE', 'Branch', id, { before, after: branch });

        return branch;
    }

    async deactivate(id: string, actorId?: string) {
        const branch = await this.prisma.branch.update({
            where: { id },
            data: { isActive: false }
        });

        await this.audit.log(actorId ?? null, 'DEACTIVATE', 'Branch', id, branch);

        return branch;
    }

    async delete(id: string, actorId?: string) {
        await this.audit.log(actorId ?? null, 'DELETE', 'Branch', id);
        return this.prisma.branch.delete({ where: { id } });
    }
}
