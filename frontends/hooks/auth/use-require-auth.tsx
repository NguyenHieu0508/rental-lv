"use client";

import { useAuth } from "@/hooks/auth/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    return { user, loading, isAuthenticated };
}
