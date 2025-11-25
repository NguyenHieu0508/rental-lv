import api from "@/lib/api";

export const maintenanceService = {
    list: () => api.get("/maintenance").then(r => r.data),
    get: (id: string) => api.get(`/maintenance/${id}`).then(r => r.data),
    create: (data: any) => api.post("/maintenance", data).then(r => r.data),
    update: (id: string, data: any) => api.patch(`/maintenance/${id}`, data).then(r => r.data),
    delete: (id: string) => api.delete(`/maintenance/${id}`).then(r => r.data),
};
