import {
    Body, Controller, Delete, Get,
    Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('branches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Get()
    findAll() {
        return this.branchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.branchService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateBranchDto) {
        return this.branchService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
        return this.branchService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.branchService.remove(id);
    }
}
