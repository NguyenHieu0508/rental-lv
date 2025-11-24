import { VehicleCategoryService } from './vehicle-category.service';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
export declare class VehicleCategoryController {
    private service;
    constructor(service: VehicleCategoryService);
    findAll(keyword?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        code: string | null;
        description: string | null;
        imageUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        seoTitle: string | null;
        hTitle: string | null;
        displayOrder: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
        id: string;
        name: string;
        code: string | null;
        description: string | null;
        imageUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        seoTitle: string | null;
        hTitle: string | null;
        displayOrder: number | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: CreateVehicleCategoryDto): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
        id: string;
        name: string;
        code: string | null;
        description: string | null;
        imageUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        seoTitle: string | null;
        hTitle: string | null;
        displayOrder: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateVehicleCategoryDto): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
        id: string;
        name: string;
        code: string | null;
        description: string | null;
        imageUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        seoTitle: string | null;
        hTitle: string | null;
        displayOrder: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
        id: string;
        name: string;
        code: string | null;
        description: string | null;
        imageUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        seoTitle: string | null;
        hTitle: string | null;
        displayOrder: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private validateId;
}
