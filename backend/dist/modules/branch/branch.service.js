"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
let BranchService = class BranchService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;
        const where = {};
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
    async findOne(id) {
        const branch = await this.prisma.branch.findUnique({
            where: { id },
            include: {
                vehicles: true,
                employees: true,
                bookings: true
            }
        });
        if (!branch)
            throw new common_1.NotFoundException('Branch not found');
        return branch;
    }
    async create(dto, actorId) {
        if (dto.code) {
            const exists = await this.prisma.branch.findUnique({ where: { code: dto.code } });
            if (exists)
                throw new common_1.BadRequestException('Branch code already exists');
        }
        const branch = await this.prisma.branch.create({
            data: dto
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CREATE', 'Branch', branch.id, branch);
        return branch;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        if (dto.code && dto.code !== before.code) {
            const exists = await this.prisma.branch.findUnique({ where: { code: dto.code } });
            if (exists)
                throw new common_1.BadRequestException('Branch code already exists');
        }
        const branch = await this.prisma.branch.update({
            where: { id },
            data: dto
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Branch', id, { before, after: branch });
        return branch;
    }
    async deactivate(id, actorId) {
        const branch = await this.prisma.branch.update({
            where: { id },
            data: { isActive: false }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DEACTIVATE', 'Branch', id, branch);
        return branch;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Branch', id);
        return this.prisma.branch.delete({ where: { id } });
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], BranchService);
//# sourceMappingURL=branch.service.js.map