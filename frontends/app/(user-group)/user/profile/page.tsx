"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";


export default function CarsPage() {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return <div className="p-4 text-gray-400">Đang tải thông tin...</div>;
    }

    return (
        <div className="p-6 text-gray-200">
            <h1 className="text-2xl font-bold mb-4">Thông tin người dùng</h1>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 w-full max-w-lg">
                <p className="mb-2"><b>Email:</b> {user?.email}</p>
                <p className="mb-2"><b>Tên:</b> {user?.name ?? "—"}</p>
                <p className="mb-2"><b>Vai trò:</b> {user?.role}</p>
                <p className="mb-2"><b>Ngày tạo:</b> {new Date(user?.createdAt).toLocaleString("vi-VN")}</p>
            </div>
        </div>
    );
}
