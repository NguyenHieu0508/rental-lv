import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEnum(['ADMIN', 'STAFF', 'CUSTOMER'])
    role?: string;

    @IsOptional()
    isActive?: boolean;
}
