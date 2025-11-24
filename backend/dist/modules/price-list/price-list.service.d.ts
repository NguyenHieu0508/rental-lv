import { PrismaService } from '@/prisma/prisma.service';
import { CreatePriceListDto } from './dto/create-pricelist.dto';
import { UpdatePriceListDto } from './dto/update-pricelist.dto';
export declare class PriceListService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(keyword?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        description: string | null;
        currency: string;
        dailyRate: number;
        hourlyRate: number | null;
        weekendRate: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        currency: string;
        dailyRate: number;
        hourlyRate: number | null;
        weekendRate: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreatePriceListDto): import(".prisma/client").Prisma.Prisma__PriceListClient<{
        id: string;
        name: string;
        description: string | null;
        currency: string;
        dailyRate: number;
        hourlyRate: number | null;
        weekendRate: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdatePriceListDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        currency: string;
        dailyRate: number;
        hourlyRate: number | null;
        weekendRate: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        currency: string;
        dailyRate: number;
        hourlyRate: number | null;
        weekendRate: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
