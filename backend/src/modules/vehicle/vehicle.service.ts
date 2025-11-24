import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { sanitizeUpdate } from '@/common/utils/sanitize-update';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';

@Injectable()
export class VehicleService {
    constructor(private prisma: PrismaService, private cloudinary: CloudinaryService
    ) { }

    async findAll(keyword?: string) {
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

        const categoryIds = vehicles.map((v: { categoryId: any; }) => v.categoryId);
        const branchIds = vehicles.map((v: { branchId: any; }) => v.branchId);
        const priceListIds = vehicles.map((v: { priceListId: any; }) => v.priceListId);

        const [categories, branches, priceLists] = await Promise.all([
            this.prisma.vehicleCategory.findMany({ where: { id: { in: categoryIds } } }),
            this.prisma.branch.findMany({ where: { id: { in: branchIds } } }),
            this.prisma.priceList.findMany({ where: { id: { in: priceListIds } } }),
        ]);

        return vehicles.map((v: { categoryId: any; branchId: any; priceListId: any; }) => ({
            ...v,
            category: categories.find((c: { id: any; }) => c.id === v.categoryId),
            branch: branches.find((b: { id: any; }) => b.id === v.branchId),
            priceList: priceLists.find((p: { id: any; }) => p.id === v.priceListId),
        }));
    }

    async findOne(id: string) {
        const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
        if (!vehicle) throw new NotFoundException('Vehicle not found');

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

        return {
            ...vehicle,
            category,
            branch,
            priceList,
        };
    }


    create(dto: CreateVehicleDto) {
        return this.prisma.vehicle.create({ data: dto });
    }

    async update(id: string, dto: UpdateVehicleDto) {
        await this.findOne(id);

        const safeData = sanitizeUpdate(dto);

        return this.prisma.vehicle.update({
            where: { id },
            data: safeData,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.vehicle.delete({ where: { id } });
    }
    async uploadPhotos(files: Express.Multer.File[]) {
        const upload = files.map((file) =>
            this.cloudinary.uploadImage(file)
        );

        const results = await Promise.all(upload);

        return {
            urls: results.map((r) => r.secure_url),
        };
    }

}
