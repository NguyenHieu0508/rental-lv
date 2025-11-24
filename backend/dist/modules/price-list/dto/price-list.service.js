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
exports.PriceListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const sanitize_update_1 = require("../../../common/utils/sanitize-update");
let PriceListService = class PriceListService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(keyword) {
        return this.prisma.priceList.findMany({
            where: keyword
                ? {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { description: { contains: keyword, mode: 'insensitive' } },
                    ],
                }
                : {},
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const found = await this.prisma.priceList.findUnique({ where: { id } });
        if (!found)
            throw new common_1.NotFoundException('Price List not found');
        return found;
    }
    create(dto) {
        return this.prisma.priceList.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        const safeData = (0, sanitize_update_1.sanitizeUpdate)(dto);
        return this.prisma.priceList.update({
            where: { id },
            data: safeData,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.priceList.delete({ where: { id } });
    }
};
exports.PriceListService = PriceListService;
exports.PriceListService = PriceListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PriceListService);
//# sourceMappingURL=price-list.service.js.map