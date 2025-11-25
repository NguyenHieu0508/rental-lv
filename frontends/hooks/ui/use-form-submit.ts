import { useApiMutation } from "../useHooks";

export function useFormSubmit(mutationFn: any, invalidateKey?: any[]) {
    const mutation = useApiMutation(mutationFn, invalidateKey);
    const handleSubmit = async (data: any) => {
        await mutation.mutateAsync(data);
    };
    return { ...mutation, handleSubmit };
}