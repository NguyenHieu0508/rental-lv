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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const crypto_1 = require("crypto");
let BillingService = class BillingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAllInvoices() {
        return this.prisma.invoice.findMany();
    }
    async findInvoice(id) {
        const data = await this.prisma.invoice.findUnique({ where: { id } });
        if (!data)
            throw new common_1.NotFoundException('Invoice not found');
        return data;
    }
    async createInvoice(dto) {
        var _a, _b;
        const invoiceNo = 'INV-' + (0, crypto_1.randomUUID)().slice(0, 8).toUpperCase();
        return this.prisma.invoice.create({
            data: {
                invoiceNo,
                bookingId: dto.bookingId,
                customerId: dto.customerId,
                subtotal: dto.subtotal,
                surchargeTotal: (_a = dto.surchargeTotal) !== null && _a !== void 0 ? _a : 0,
                discountTotal: (_b = dto.discountTotal) !== null && _b !== void 0 ? _b : 0,
                totalAmount: dto.totalAmount
            }
        });
    }
    async createPayment(dto) {
        const invoice = await this.findInvoice(dto.invoiceId);
        await this.prisma.payment.create({
            data: {
                invoiceId: dto.invoiceId,
                method: dto.method,
                amount: dto.amount,
                referenceNo: dto.referenceNo,
                note: dto.note
            }
        });
        return { message: 'Payment recorded successfully' };
    }
    findPayments(invoiceId) {
        return this.prisma.payment.findMany({
            where: { invoiceId }
        });
    }
    async addSurcharge(dto) {
        await this.findInvoice(dto.invoiceId);
        return this.prisma.surcharge.create({
            data: {
                invoiceId: dto.invoiceId,
                name: dto.name,
                amount: dto.amount
            }
        });
    }
    findSurcharges(invoiceId) {
        return this.prisma.surcharge.findMany({
            where: { invoiceId }
        });
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingService);
//# sourceMappingURL=billing.service.js.map