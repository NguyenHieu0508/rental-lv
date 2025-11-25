import api from "@/lib/api";

export const promotionService = {
    list: () => api.get("/promotions").then(r => r.data),
    get: (id: string) => api.get(`/promotions/${id}`).then(r => r.data),
    create: (data: any) => api.post("/promotions", data).then(r => r.data),
    update: (id: string, data: any) => api.patch(`/promotions/${id}`, data).then(r => r.data),
    delete: (id: string) => api.delete(`/promotions/${id}`).then(r => r.data),
};
