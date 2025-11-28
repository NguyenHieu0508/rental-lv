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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const audit_log_service_1 = require("../audit-log/audit-log.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let CustomerService = class CustomerService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(query) {
        const page = query.page ? Number(query.page) : 1;
        const limit = query.limit ? Number(query.limit) : 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.OR = [
                { fullName: { contains: query.search, mode: 'insensitive' } },
                { phone: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.customer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.customer.count({ where })
        ]);
        return {
            items,
            page,
            total,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async findOne(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                bookings: true,
                reviews: true,
                invoices: true
            }
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async create(dto, actorId) {
        if (dto.userId) {
            const exists = await this.prisma.customer.findUnique({
                where: { userId: dto.userId }
            });
            if (exists)
                throw new common_1.BadRequestException('User already linked to another customer');
        }
        const customer = await this.prisma.customer.create({
            data: Object.assign(Object.assign({}, dto), { driverLicenseExpiry: dto.driverLicenseExpiry ? new Date(dto.driverLicenseExpiry) : undefined })
        });
        await this.audit.log(actorId, 'CREATE', 'Customer', customer.id, customer);
        return customer;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        const updateData = Object.assign(Object.assign({}, dto), { driverLicenseExpiry: dto.driverLicenseExpiry ? new Date(dto.driverLicenseExpiry) : undefined });
        const updated = await this.prisma.customer.update({
            where: { id },
            data: updateData
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Customer', id, {
            before,
            after: updated
        });
        return updated;
    }
    async updateLoyalty(id, points, actorId) {
        const customer = await this.findOne(id);
        const newPoints = customer.loyaltyPoints + points;
        let newTier = 'BASIC';
        if (newPoints > 50000000)
            newTier = 'VIP';
        else if (newPoints > 20000000)
            newTier = 'GOLD';
        else if (newPoints > 5000000)
            newTier = 'SILVER';
        const updated = await this.prisma.customer.update({
            where: { id },
            data: {
                loyaltyPoints: newPoints,
                membershipTier: newTier
            }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'LOYALTY_UPDATE', 'Customer', id, updated);
        return updated;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Customer', id);
        return this.prisma.customer.delete({ where: { id } });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map