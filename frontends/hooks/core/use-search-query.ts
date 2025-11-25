import { useSearchParams } from "next/navigation";
import { useApiQuery } from "./use-api-query";

export function useSearchQuery(key: any[], queryFn: (p: URLSearchParams) => Promise<any>) {
    const params = useSearchParams();
    return useApiQuery([...key, params.toString()], () => queryFn(params));
}