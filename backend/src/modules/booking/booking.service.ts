import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.booking.findMany();
    }

    async findOne(id: string) {
        const data = await this.prisma.booking.findUnique({ where: { id } });
        if (!data) throw new NotFoundException('Booking not found');
        return data;
    }

    async create(dto: CreateBookingDto) {
        const bookingCode = 'BK-' + randomUUID().slice(0, 8).toUpperCase();

        return this.prisma.booking.create({
            data: {
                bookingCode,
                customerId: dto.customerId,
                vehicleId: dto.vehicleId,
                branchId: dto.branchId,
                pickupDate: new Date(dto.pickupDate),
                returnDate: new Date(dto.returnDate),
                status: 'PENDING',
                baseAmount: dto.baseAmount,
                discountAmount: 0,
                totalAmount: dto.baseAmount,
            }
        });
    }

    async updateStatus(id: string, status: string) {
        await this.findOne(id);
        return this.prisma.booking.update({
            where: { id },
            data: { status }
        });
    }
}
