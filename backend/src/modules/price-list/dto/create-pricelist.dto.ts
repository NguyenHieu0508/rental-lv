import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreatePriceListDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsNumber()
    dailyRate!: number;

    @IsOptional()
    @IsNumber()
    hourlyRate?: number;

    @IsOptional()
    @IsNumber()
    weekendRate?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
