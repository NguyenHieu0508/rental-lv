import api from "@/lib/api";

export const depositService = {
    get: (bookingId: string) =>
        api.get(`/deposit/${bookingId}`).then(r => r.data),

    create: (data: any) =>
        api.post("/deposit", data).then(r => r.data),

    addDetail: (data: any) =>
        api.post("/deposit/detail", data).then(r => r.data),

    details: (depositId: string) =>
        api.get(`/deposit/detail/${depositId}`).then(r => r.data),
};
