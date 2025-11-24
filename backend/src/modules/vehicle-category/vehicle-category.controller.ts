import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
    BadRequestException
} from '@nestjs/common';
import { VehicleCategoryService } from './vehicle-category.service';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';

@Controller('vehicle-categories')
export class VehicleCategoryController {
    constructor(private service: VehicleCategoryService) { }

    // GET ALL + SEARCH
    @Get()
    findAll(@Query('keyword') keyword?: string) {
        return this.service.findAll(keyword);
    }

    // GET ONE
    @Get(':id')
    findOne(@Param('id') id: string) {
        this.validateId(id);
        return this.service.findOne(id);
    }

    // CREATE
    @Post()
    create(@Body() dto: CreateVehicleCategoryDto) {
        return this.service.create(dto);
    }

    // UPDATE
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateVehicleCategoryDto
    ) {
        this.validateId(id);
        return this.service.update(id, dto);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        this.validateId(id);
        return this.service.delete(id);
    }

    // Helper: validate MongoDB ObjectId
    private validateId(id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Invalid ID format');
        }
    }
}
