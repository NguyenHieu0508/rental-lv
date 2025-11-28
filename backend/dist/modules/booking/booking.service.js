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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
const crypto_1 = require("crypto");
let BookingService = class BookingService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    generateBookingCode() {
        return 'BKG-' + (0, crypto_1.randomBytes)(4).toString('hex').toUpperCase();
    }
    async checkVehicleAvailable(vehicleId, pickup, rt) {
        const overlapping = await this.prisma.booking.findFirst({
            where: {
                vehicleId,
                status: { in: ['PENDING', 'CONFIRMED', 'ONGOING'] },
                OR: [
                    {
                        pickupDate: { lte: rt },
                        returnDate: { gte: pickup }
                    }
                ]
            }
        });
        return !overlapping;
    }
    async calcPrice(vehicleId, pickup, rt) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id: vehicleId },
            include: { priceList: true }
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        if (!vehicle.priceList)
            throw new common_1.BadRequestException('Vehicle has no price list');
        const ms = rt.getTime() - pickup.getTime();
        const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
        const base = days * vehicle.priceList.dailyRate;
        return base;
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.bookingCode = { contains: query.search, mode: 'insensitive' };
        }
        if (query.status)
            where.status = query.status;
        if (query.branchId)
            where.branchId = query.branchId;
        if (query.customerId)
            where.customerId = query.customerId;
        if (query.vehicleId)
            where.vehicleId = query.vehicleId;
        const [items, total] = await this.prisma.$transaction([
            this.prisma.booking.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    customer: true,
                    vehicle: true,
                    branch: true,
                    returnBranch: true
                }
            }),
            this.prisma.booking.count({ where })
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
        const b = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                customer: true,
                vehicle: true,
                branch: true,
                returnBranch: true,
                contract: true,
                deposit: true,
                handover: true,
                returnReport: true,
                invoice: true
            }
        });
        if (!b)
            throw new common_1.NotFoundException('Booking not found');
        return b;
    }
    async create(dto, actorId) {
        var _a;
        const pickup = new Date(dto.pickupDate);
        const rt = new Date(dto.returnDate);
        if (pickup >= rt)
            throw new common_1.BadRequestException('Invalid pickup/return date');
        const available = await this.checkVehicleAvailable(dto.vehicleId, pickup, rt);
        if (!available)
            throw new common_1.BadRequestException('Vehicle not available for selected dates');
        const baseAmount = await this.calcPrice(dto.vehicleId, pickup, rt);
        const discount = (_a = dto.discountAmount) !== null && _a !== void 0 ? _a : 0;
        const total = baseAmount - discount;
        const booking = await this.prisma.booking.create({
            data: {
                bookingCode: this.generateBookingCode(),
                customerId: dto.customerId,
                vehicleId: dto.vehicleId,
                branchId: dto.branchId,
                returnBranchId: dto.returnBranchId,
                pickupDate: pickup,
                returnDate: rt,
                baseAmount,
                discountAmount: discount,
                totalAmount: total,
                promotionId: dto.promotionId,
                note: dto.note,
                status: 'PENDING'
            }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CREATE', 'Booking', booking.id, booking);
        return booking;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        const pickup = dto.pickupDate ? new Date(dto.pickupDate) : before.pickupDate;
        const rt = dto.returnDate ? new Date(dto.returnDate) : before.returnDate;
        if (pickup >= rt)
            throw new common_1.BadRequestException('Invalid pickup/return date');
        const updated = await this.prisma.booking.update({
            where: { id },
            data: dto
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Booking', id, {
            before,
            after: updated
        });
        return updated;
    }
    async changeStatus(id, status, actorId) {
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'STATUS', 'Booking', id, { status });
        return updated;
    }
    async cancel(id, reason, actorId) {
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED', cancelReason: reason }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CANCEL', 'Booking', id, { reason });
        return updated;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Booking', id);
        return this.prisma.booking.delete({ where: { id } });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], BookingService);
//# sourceMappingURL=booking.service.js.map