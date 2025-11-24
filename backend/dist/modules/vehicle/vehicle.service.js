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
const sanitize_update_1 = require("../../common/utils/sanitize-update");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let VehicleService = class VehicleService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async findAll(keyword) {
        const vehicles = await this.prisma.vehicle.findMany({
            where: keyword
                ? {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { licensePlate: { contains: keyword, mode: 'insensitive' } },
                        { brand: { contains: keyword, mode: 'insensitive' } },
                    ],
                }
                : {},
            orderBy: { createdAt: 'desc' },
        });
        const categoryIds = vehicles.map((v) => v.categoryId);
        const branchIds = vehicles.map((v) => v.branchId);
        const priceListIds = vehicles.map((v) => v.priceListId);
        const [categories, branches, priceLists] = await Promise.all([
            this.prisma.vehicleCategory.findMany({ where: { id: { in: categoryIds } } }),
            this.prisma.branch.findMany({ where: { id: { in: branchIds } } }),
            this.prisma.priceList.findMany({ where: { id: { in: priceListIds } } }),
        ]);
        return vehicles.map((v) => (Object.assign(Object.assign({}, v), { category: categories.find((c) => c.id === v.categoryId), branch: branches.find((b) => b.id === v.branchId), priceList: priceLists.find((p) => p.id === v.priceListId) })));
    }
    async findOne(id) {
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const categoryPromise = vehicle.categoryId
            ? this.prisma.vehicleCategory.findUnique({ where: { id: vehicle.categoryId } })
            : null;
        const branchPromise = vehicle.branchId
            ? this.prisma.branch.findUnique({ where: { id: vehicle.branchId } })
            : null;
        const priceListPromise = vehicle.priceListId
            ? this.prisma.priceList.findUnique({ where: { id: vehicle.priceListId } })
            : null;
        const [category, branch, priceList] = await Promise.all([
            categoryPromise,
            branchPromise,
            priceListPromise,
        ]);
        return Object.assign(Object.assign({}, vehicle), { category,
            branch,
            priceList });
    }
    create(dto) {
        return this.prisma.vehicle.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        const safeData = (0, sanitize_update_1.sanitizeUpdate)(dto);
        return this.prisma.vehicle.update({
            where: { id },
            data: safeData,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.vehicle.delete({ where: { id } });
    }
    async uploadPhotos(files) {
        const upload = files.map((file) => this.cloudinary.uploadImage(file));
        const results = await Promise.all(upload);
        return {
            urls: results.map((r) => r.secure_url),
        };
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, cloudinary_service_1.CloudinaryService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map