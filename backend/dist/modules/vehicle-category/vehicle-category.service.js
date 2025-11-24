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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let VehicleCategoryService = class VehicleCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll2() {
        return this.prisma.vehicleCategory.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    create(data) {
        return this.prisma.vehicleCategory.create({ data });
    }
    update(id, data) {
        const { id: _remove, createdAt, updatedAt } = data, safeData = __rest(data, ["id", "createdAt", "updatedAt"]);
        return this.prisma.vehicleCategory.update({
            where: { id },
            data: safeData,
        });
    }
    delete(id) {
        return this.prisma.vehicleCategory.delete({
            where: { id },
        });
    }
    findAll(keyword) {
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
    findOne(id) {
        return this.prisma.vehicleCategory.findUnique({ where: { id } });
    }
};
exports.VehicleCategoryService = VehicleCategoryService;
exports.VehicleCategoryService = VehicleCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleCategoryService);
//# sourceMappingURL=vehicle-category.service.js.map