import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListQueryDto } from './dto/price-list-query.dto';
import { CreatePriceListDto } from './dto/create-pricelist.dto';
import { UpdatePriceListDto } from './dto/update-pricelist.dto';

@Controller('price-lists')
export class PriceListController {
    constructor(private service: PriceListService) { }

    @Get()
    list(@Query() query: PriceListQueryDto) {
        return this.service.findAll(query);
    }

    @Get(':id')
    detail(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreatePriceListDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePriceListDto) {
        return this.service.update(id, dto);
    }

    @Patch(':id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.service.deactivate(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
