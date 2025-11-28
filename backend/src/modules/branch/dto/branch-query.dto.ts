import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class BranchQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    isActive?: string; // 'true' | 'false'

    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;
}
