import api from "@/lib/api";

export const rentalProcessService = {
    contract: (bookingId: string) =>
        api.get(`/contract/${bookingId}`).then(r => r.data),

    createContract: (data: any) =>
        api.post("/contract", data).then(r => r.data),

    handover: (bookingId: string) =>
        api.get(`/handover/${bookingId}`).then(r => r.data),

    createHandover: (data: any) =>
        api.post("/handover", data).then(r => r.data),

    returnReport: (bookingId: string) =>
        api.get(`/return-report/${bookingId}`).then(r => r.data),

    createReturnReport: (data: any) =>
        api.post("/return-report", data).then(r => r.data),
};
