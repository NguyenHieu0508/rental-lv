import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class UpdateContractDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    @IsOptional()
    @IsNumber()
    depositAmount?: number;

    @IsOptional()
    @IsString()
    terms?: string;

    @IsOptional()
    @IsString()
    customerSignature?: string;

    @IsOptional()
    @IsString()
    employeeSignature?: string;

    @IsOptional()
    @IsString()
    signedBy?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    fileUrl?: string;
}
