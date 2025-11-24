import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateVehicleCategoryDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
