import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEnum(['ADMIN', 'STAFF', 'CUSTOMER'])
    role?: string;
}
