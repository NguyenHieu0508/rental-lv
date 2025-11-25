import { useQuery } from "@tanstack/react-query";

export function useApiQuery(key: any[], queryFn: () => Promise<any>, enabled: boolean = true, options: any = {}) {
    return useQuery({ queryKey: key, queryFn, enabled, ...options });
}