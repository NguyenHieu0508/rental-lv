import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.branch.findMany();
    }

    async findOne(id: string) {
        const branch = await this.prisma.branch.findUnique({ where: { id } });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    create(dto: CreateBranchDto) {
        return this.prisma.branch.create({ data: dto });
    }

    async update(id: string, dto: UpdateBranchDto) {
        await this.findOne(id);

        const data: any = { ...dto };

        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;

        return this.prisma.branch.update({
            where: { id },
            data,
        });
    }




    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.branch.delete({ where: { id } });
    }
}
