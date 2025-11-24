import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
    @IsString()
    bookingId!: string;

    @IsString()
    customerId!: string;

    @IsNumber()
    subtotal!: number;

    @IsOptional()
    @IsNumber()
    surchargeTotal?: number;

    @IsOptional()
    @IsNumber()
    discountTotal?: number;

    @IsNumber()
    totalAmount!: number;
}
