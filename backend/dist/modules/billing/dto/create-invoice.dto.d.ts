export declare class CreateInvoiceDto {
    bookingId: string;
    customerId: string;
    subtotal: number;
    surchargeTotal?: number;
    discountTotal?: number;
    totalAmount: number;
}
