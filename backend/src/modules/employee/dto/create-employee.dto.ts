import { IsNotEmpty, IsOptional, IsString, IsEmail, IsDateString, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    nationalId?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsNumber()
    salary?: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsDateString()
    hireDate?: string;

    @IsOptional()
    userId?: string;

    @IsOptional()
    branchId?: string;

    @IsOptional()
    avatarUrl?: string;
}
