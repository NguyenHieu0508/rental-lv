import { useQuery } from "@tanstack/react-query";
import { vehicleService } from "@/services/vehicle.service";

export function useVehicles(keyword: string = "") {
    return useQuery({
        queryKey: ["vehicles", keyword],
        queryFn: () => vehicleService.getAll(keyword),
    });
}
