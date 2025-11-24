import { PrismaService } from '@/prisma/prisma.service';
export declare class VehicleCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll2(): import(".prisma/client").Prisma.PrismaPromise<{
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
    create(data: any): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
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
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__VehicleCategoryClient<{
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
}
