"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";
import { ROLE_MENU_SIDEBAR } from "@/lib/role-menu-sidebar";

export function Sidebar() {
    const { user } = useAuth();
    const pathname = usePathname();

    if (!user) return null;

    const menu =
        ROLE_MENU_SIDEBAR[user.role as keyof typeof ROLE_MENU_SIDEBAR] || [];

    return (
        <aside className="w-64 bg-slate-800 text-gray-200 border-r border-slate-700 p-4">
            <nav className="flex flex-col gap-2">
                {menu.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                px-3 py-2 rounded-lg transition
                ${active
                                    ? "bg-cyan-600 text-white"
                                    : "hover:bg-slate-700"
                                }
              `}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
