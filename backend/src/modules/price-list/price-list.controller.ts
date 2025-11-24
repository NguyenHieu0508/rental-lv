import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CreatePriceListDto } from './dto/create-pricelist.dto';
import { UpdatePriceListDto } from './dto/update-pricelist.dto';
import { PriceListService } from './price-list.service';

@Controller('price-lists')
export class PriceListController {
    constructor(private readonly service: PriceListService) { }

    @Get()
    findAll(@Query('keyword') keyword?: string) {
        return this.service.findAll(keyword);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreatePriceListDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePriceListDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
