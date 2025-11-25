import api from "@/lib/api";

export const reviewService = {
    list: () => api.get("/reviews").then(r => r.data),
    get: (id: string) => api.get(`/reviews/${id}`).then(r => r.data),
    create: (data: any) => api.post("/reviews", data).then(r => r.data),
};
