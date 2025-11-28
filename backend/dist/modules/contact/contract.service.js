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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_log_service_1 = require("../audit-log/audit-log.service");
const crypto_1 = require("crypto");
let ContractService = class ContractService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    generateContractNo() {
        return 'CTR-' + (0, crypto_1.randomBytes)(4).toString('hex').toUpperCase();
    }
    async findOne(id) {
        const c = await this.prisma.contract.findUnique({
            where: { id },
            include: { booking: true }
        });
        if (!c)
            throw new common_1.NotFoundException('Contract not found');
        return c;
    }
    async findByBooking(bookingId) {
        return this.prisma.contract.findUnique({
            where: { bookingId }
        });
    }
    async create(dto, actorId) {
        var _a, _b;
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId }
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        const exists = await this.findByBooking(dto.bookingId);
        if (exists)
            throw new common_1.BadRequestException('Contract already exists for this booking');
        const contract = await this.prisma.contract.create({
            data: {
                bookingId: dto.bookingId,
                contractNo: this.generateContractNo(),
                startDate: dto.startDate ? new Date(dto.startDate) : booking.pickupDate,
                endDate: dto.endDate ? new Date(dto.endDate) : booking.returnDate,
                totalAmount: (_a = dto.totalAmount) !== null && _a !== void 0 ? _a : booking.totalAmount,
                depositAmount: dto.depositAmount,
                terms: (_b = dto.terms) !== null && _b !== void 0 ? _b : 'Default rental contract terms...',
                notes: dto.notes,
                status: 'DRAFT'
            }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'CREATE', 'Contract', contract.id, contract);
        return contract;
    }
    async update(id, dto, actorId) {
        const before = await this.findOne(id);
        const contract = await this.prisma.contract.update({
            where: { id },
            data: Object.assign(Object.assign({}, dto), { startDate: dto.startDate ? new Date(dto.startDate) : before.startDate, endDate: dto.endDate ? new Date(dto.endDate) : before.endDate })
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'UPDATE', 'Contract', id, {
            before,
            after: contract
        });
        return contract;
    }
    async changeStatus(id, status, actorId) {
        const contract = await this.prisma.contract.update({
            where: { id },
            data: { status }
        });
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'STATUS', 'Contract', id, { status });
        return contract;
    }
    async delete(id, actorId) {
        await this.audit.log(actorId !== null && actorId !== void 0 ? actorId : null, 'DELETE', 'Contract', id);
        return this.prisma.contract.delete({ where: { id } });
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], ContractService);
//# sourceMappingURL=contract.service.js.map