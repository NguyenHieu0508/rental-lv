import { useSearchParams } from "next/navigation";

export function usePagination(defaultPage = 1) {
    const params = useSearchParams();
    const page = Number(params.get("page")) || defaultPage;
    const nextPage = page + 1;
    const prevPage = page > 1 ? page - 1 : 1;
    return { page, nextPage, prevPage };
}