import api from "@/lib/api";

export const branchService = {
    getAll(keyword?: string) {
        return api.get("/branches", { params: { keyword } }).then((r: { data: any; }) => r.data);
    },

    create(data: any) {
        return api.post("/branches", data).then((r: { data: any; }) => r.data);
    },

    update(id: string, data: any) {
        return api.patch(`/branches/${id}`, data).then((r: { data: any; }) => r.data);
    },

    delete(id: string) {
        return api.delete(`/branches/${id}`).then((r: { data: any; }) => r.data);
    }
};
