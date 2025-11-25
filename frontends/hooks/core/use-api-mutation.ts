import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApiMutation(mutationFn: (data: any) => Promise<any>, invalidateKey?: any[], options: any = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (invalidateKey) queryClient.invalidateQueries({ queryKey: invalidateKey });
            options?.onSuccess?.(data);
        },
        onError: options?.onError,
    });
}