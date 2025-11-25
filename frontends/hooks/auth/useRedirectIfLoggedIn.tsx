"use client";

import { useAuth } from "@/hooks/auth/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectIfLoggedIn() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [loading, isAuthenticated, router]);
}
