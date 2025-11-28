import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @IsNotEmpty()
    @IsString()
    phone!: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    driverLicenseNo?: string;

    @IsOptional()
    @IsDateString()
    driverLicenseExpiry?: string;

    @IsOptional()
    @IsString()
    nationalId?: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    // nếu muốn link sẵn với User
    @IsOptional()
    userId?: string;
}
