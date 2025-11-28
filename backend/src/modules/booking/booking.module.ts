import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
    controllers: [BookingController],
    providers: [BookingService, PrismaService, AuditLogService],
    exports: [BookingService]
})
export class BookingModule { }
