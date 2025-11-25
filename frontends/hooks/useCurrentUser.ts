"use client";

import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: () => authService.me(),
        retry: false,            // tránh loop nếu token sai
        refetchOnWindowFocus: false,
    });
}
