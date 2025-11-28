export declare class CreateBookingDto {
    customerId: string;
    vehicleId: string;
    branchId: string;
    returnBranchId?: string;
    pickupDate: string;
    returnDate: string;
    discountAmount?: number;
    promotionId?: string;
    note?: string;
}
