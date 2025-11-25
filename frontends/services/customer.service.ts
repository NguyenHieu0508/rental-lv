import api from "@/lib/api";

export const customerService = {
    list: () => api.get("/customers").then(r => r.data),
    get: (id: string) => api.get(`/customers/${id}`).then(r => r.data),
    create: (data: any) => api.post("/customers", data).then(r => r.data),
    update: (id: string, data: any) => api.patch(`/customers/${id}`, data).then(r => r.data),
    delete: (id: string) => api.delete(`/customers/${id}`).then(r => r.data),
};
