import api from "@/lib/api";

export const documentService = {
    list: (vehicleId: string) =>
        api.get(`/vehicle-documents/${vehicleId}`).then(r => r.data),

    create: (vehicleId: string, data: any) =>
        api.post(`/vehicle-documents/${vehicleId}`, data).then(r => r.data),

    delete: (id: string) =>
        api.delete(`/vehicle-documents/${id}`).then(r => r.data),
};
