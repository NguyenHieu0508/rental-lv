import api from "@/lib/api";

export const vehicleService = {
    getAll(keyword?: string) {
        return api.get("/vehicles", { params: { keyword } }).then(res => res.data);
    },

    getOne(id: string) {
        return api.get(`/vehicles/${id}`).then(res => res.data);
    },

    create(data: any) {
        return api.post("/vehicles", data).then(res => res.data);
    },

    update(id: string, data: any) {
        return api.patch(`/vehicles/${id}`, data).then(res => res.data);
    },

    delete(id: string) {
        return api.delete(`/vehicles/${id}`).then(res => res.data);
    },

    uploadPhotos(files: File[]) {
        const form = new FormData();
        files.forEach(file => form.append("files", file));

        return api.post("/upload/images", form, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => res.data);
    }
};
