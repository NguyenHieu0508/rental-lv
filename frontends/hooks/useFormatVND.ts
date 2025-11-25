export function useFormatVND() {
    const formatVND = (amount: number | string | undefined | null) => {
        if (amount === null || amount === undefined || amount === "") return "0 ₫";

        const num = Number(amount);
        if (isNaN(num)) return "0 ₫";

        return num.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });
    };

    return { formatVND };
}
