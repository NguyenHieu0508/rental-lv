import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    customerId!: string;

    @IsString()
    vehicleId!: string;

    @IsString()
    branchId!: string;

    @IsDateString()
    pickupDate!: string;

    @IsDateString()
    returnDate!: string;

    @IsNumber()
    baseAmount!: number;
}
