import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(['ADMIN', 'STAFF', 'CUSTOMER'])
    role?: string;

    @IsOptional()
    isActive?: string; // 'true' | 'false'

    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;
}
