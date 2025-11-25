"use client";

import {
    createContext,
    useContext,
    useEffect,
    useCallback
} from "react";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

type AuthUser = {
    id: string;
    email: string;
    role: string;
    name?: string;
};

interface AuthContextProps {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();

    const {
        data: user,
        refetch: loadProfile,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["auth", "profile"],
        queryFn: async () => {
            const token = authService.getToken();
            if (!token) throw new Error("No token");
            return userService.me();
        },
        enabled: !!authService.getToken(),
        retry: false,
        staleTime: 5 * 60 * 1000
    });

    const logout = useCallback(() => {
        authService.logout();
        queryClient.clear();
    }, [queryClient]);

    const refreshProfile = useCallback(() => {
        loadProfile();
    }, [loadProfile]);

    const value: AuthContextProps = {
        user: user ?? null,
        loading: isLoading || isFetching,
        isAuthenticated: !!user,
        logout,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return ctx;
}

export function useLogin() {
    const { refreshProfile } = useAuth();

    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            authService.login(data),
        onSuccess: async () => {
            await refreshProfile();
        }
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: { email: string; password: string; name?: string }) =>
            authService.register(data)
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: { email: string }) =>
            authService.forgotPassword(data)
    });
}