import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    invoiceId!: string;

    @IsString()
    method!: string;

    @IsNumber()
    amount!: number;

    @IsOptional()
    @IsString()
    referenceNo?: string;

    @IsOptional()
    @IsString()
    note?: string;
}
