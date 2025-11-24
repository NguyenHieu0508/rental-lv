import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePriceListDto } from './dto/create-pricelist.dto';
import { UpdatePriceListDto } from './dto/update-pricelist.dto';
import { sanitizeUpdate } from '@/common/utils/sanitize-update';

@Injectable()
export class PriceListService {
    constructor(private prisma: PrismaService) { }

    findAll(keyword?: string) {
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

    async findOne(id: string) {
        const found = await this.prisma.priceList.findUnique({ where: { id } });
        if (!found) throw new NotFoundException('Price List not found');
        return found;
    }

    create(dto: CreatePriceListDto) {
        return this.prisma.priceList.create({ data: dto });
    }

    async update(id: string, dto: UpdatePriceListDto) {
        await this.findOne(id);

        const safeData = sanitizeUpdate(dto);

        return this.prisma.priceList.update({
            where: { id },
            data: safeData,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.priceList.delete({ where: { id } });
    }
}
