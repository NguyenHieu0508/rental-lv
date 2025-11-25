"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/vehicles", label: "Vehicles" }
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="h-16 flex items-center px-4 border-b border-slate-800">
                <span className="font-bold text-lg">Rental Admin</span>
            </div>

            <nav className="flex-1 p-3 space-y-1">
                {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href}>
                            <div className={cn("sidebar-link", active && "bg-slate-800 text-white")}>
                                <span>{link.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-slate-800">
                <Button className="w-full" variant="outline">
                    Logout
                </Button>
            </div>
        </aside>
    );
}
