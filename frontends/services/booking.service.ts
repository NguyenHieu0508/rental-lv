import api from "@/lib/api";

export const bookingService = {
    list: () => api.get("/bookings").then(r => r.data),
    get: (id: string) => api.get(`/bookings/${id}`).then(r => r.data),
    create: (data: any) => api.post("/bookings", data).then(r => r.data),
    updateStatus: (id: string, status: string) =>
        api.patch(`/bookings/${id}/status/${status}`).then(r => r.data),
};
