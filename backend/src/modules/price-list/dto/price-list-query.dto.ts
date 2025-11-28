import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PriceListQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    isActive?: string;

    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;
}
