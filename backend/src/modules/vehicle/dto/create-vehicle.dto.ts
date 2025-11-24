import {
    IsString,
    IsOptional,
    IsNotEmpty,
    IsInt,
    IsArray,
} from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    licensePlate!: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsInt()
    year?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsInt()
    mileage?: number;

    @IsOptional()
    @IsInt()
    seatCount?: number;

    @IsOptional()
    @IsString()
    transmission?: string;

    @IsOptional()
    @IsString()
    fuelType?: string;

    @IsOptional()
    @IsString()
    status?: string; // AVAILABLE, MAINTENANCE, BOOKED

    @IsArray()
    @IsString({ each: true })
    photos!: string[]; // ⭐ MULTI IMAGE

    @IsString()
    @IsNotEmpty()
    categoryId!: string;

    @IsString()
    @IsNotEmpty()
    branchId!: string;

    @IsOptional()
    @IsString()
    priceListId?: string;
}
