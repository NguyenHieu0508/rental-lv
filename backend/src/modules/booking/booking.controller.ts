import {
    Body, Controller, Get, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get()
    findAll() {
        return this.bookingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateBookingDto) {
        return this.bookingService.create(dto);
    }

    @Patch(':id/status/:status')
    updateStatus(
        @Param('id') id: string,
        @Param('status') status: string
    ) {
        return this.bookingService.updateStatus(id, status);
    }
}
