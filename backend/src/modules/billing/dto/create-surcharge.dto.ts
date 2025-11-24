import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSurchargeDto {
    @IsString()
    invoiceId!: string;

    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    reason?: string;

    @IsNumber()
    amount!: number;
}
