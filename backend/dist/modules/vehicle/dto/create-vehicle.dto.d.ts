export declare class CreateVehicleDto {
    name: string;
    licensePlate: string;
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
    mileage?: number;
    seatCount?: number;
    transmission?: string;
    fuelType?: string;
    status?: string;
    photos: string[];
    categoryId: string;
    branchId: string;
    priceListId?: string;
}
