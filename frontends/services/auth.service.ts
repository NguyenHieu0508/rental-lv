import api from "@/lib/api";

export const authService = {
    async login(data: any) {
        const res = await api.post("/auth/login", data);

        const token = res?.data?.accessToken;
        const role = res?.data?.user?.role;

        if (typeof window !== "undefined" && token) {
            localStorage.setItem("accessToken", token);
            document.cookie = `accessToken=${token}; path=/; max-age=604800`;
        }

        if (typeof window !== "undefined" && role) {
            document.cookie = `role=${role}; path=/; max-age=604800`;
            localStorage.setItem("role", role);
        }

        return res.data;
    },


    async register(data: any) {
        const res = await api.post("/auth/register", data);
        return res.data;
    },

    async forgotPassword(data: any) {
        const res = await api.post("/auth/forgot-password", data);
        return res.data;
    },

    logout() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
        }
    },

    getToken() {
        if (typeof window !== "undefined") {
            return localStorage.getItem("accessToken");
        }
        return null;
    },

    isAuthenticated() {
        if (typeof window !== "undefined") {
            return !!localStorage.getItem("accessToken");
        }
        return false;
    },
};
