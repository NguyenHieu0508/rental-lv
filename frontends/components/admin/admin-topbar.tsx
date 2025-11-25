"use client";

export default function AdminTopbar() {
    return (
        <div className="h-16 bg-white/10 backdrop-blur shadow flex items-center justify-between px-6 border-b border-slate-800">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-300">admin@test.com</span>
            </div>
        </div>
    );
}
