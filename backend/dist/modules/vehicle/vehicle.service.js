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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
let VehicleService = class VehicleService {
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
                { licensePlate: { contains: query.search, mode: 'insensitive' } },
                { brand: { contains: query.search, mode: 'insensitive' } },
                { model: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        if (query.status)
            where.status = query.status;
        if (query.branchId)
            where.branchId = query.branchId;
        if (query.categoryId)
            where.categoryId = query.categoryId;
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
    async findOne(id) {
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
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        return vehicle;
    }
    async create(dto, actorId) {
        var _a, _b;
        const exists = await this.prisma.vehicle.findUnique({
            where: { licensePlate: dto.licensePlate }
        });
        if (exists)
            throw new common_1.BadRequestException('License plate already exists');
        const vehicle = await this.prisma.vehicle.create({
            data: Object.assign(Object.assign({}, dto), { status: (_a = dto.status) !== null && _a !== void 0 ? _a : 'AVAILABLE', photos: (_b = dto.photos) !== null && _b !== void 0 ? _b : [] })
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CREATE', 'Vehicle', vehicle.id, vehicle);
        return vehicle;
    }
    async update(id, dto, actorId) {
        var _a;
        const before = await this.findOne(id);
        if (dto.licensePlate && dto.licensePlate !== before.licensePlate) {
            const exists = await this.prisma.vehicle.findUnique({
                where: { licensePlate: dto.licensePlate }
            });
            if (exists)
                throw new common_1.BadRequestException('License plate already exists');
        }
        const vehicle = await this.prisma.vehicle.update({
            where: { id },
            data: Object.assign(Object.assign({}, dto), { photos: (_a = dto.photos) !== null && _a !== void 0 ? _a : before.photos })
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Vehicle', id, {
            before,
            after: vehicle
        });
        return vehicle;
    }
    async updateStatus(id, status, actorId) {
        const vehicle = await this.prisma.vehicle.update({
            where: { id },
            data: { status }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'STATUS_UPDATE', 'Vehicle', id, {
            status
        });
        return vehicle;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Vehicle', id);
        return this.prisma.vehicle.delete({ where: { id } });
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map