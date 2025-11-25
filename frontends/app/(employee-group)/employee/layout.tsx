"use client";

import AdminTopbar from "@/components/admin/admin-topbar";
import { Sidebar } from "@/components/common/sidebar";


export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
