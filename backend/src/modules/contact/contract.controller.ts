import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
    constructor(private service: ContractService) { }

    @Get(':id')
    detail(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateContractDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateContractDto) {
        return this.service.update(id, dto);
    }

    @Patch(':id/status')
    changeStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.service.changeStatus(id, body.status);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
