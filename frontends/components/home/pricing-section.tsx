"use client";

import { useEffect, useState } from "react";
import { priceListService } from "@/services/price-list.service";
import { useFormatVND } from "@/hooks/useFormatVND";

export default function PricingSection() {
    const [packages, setPackages] = useState<any[]>([]);
    const { formatVND } = useFormatVND();

    useEffect(() => {
        priceListService.getAll().then((data) => {
            setPackages(
                data.map((p: any) => ({
                    title: p.name,
                    price: formatVND(p.dailyRate) + " / ngày",
                    features: [
                        p.description || "Gói tiêu chuẩn",
                        `Giá theo giờ: ${p.hourlyRate ? formatVND(p.hourlyRate) : "—"}`,
                        `Giá cuối tuần: ${p.weekendRate ? formatVND(p.weekendRate) : "—"}`,
                    ],
                }))
            );
        });
    }, []);

    return (
        <section className="py-20 bg-white dark:bg-black">
            <h2 className="text-3xl font-bold text-center mb-10">Thẻ thành viên</h2>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                {packages.map((p, i) => (
                    <div key={i} className="p-6 rounded-xl shadow bg-gray-100 dark:bg-zinc-900">
                        <h3 className="text-2xl font-bold">{p.title}</h3>
                        <p className="text-blue-600 text-xl font-semibold mt-2">{p.price}</p>

                        <ul className="mt-4 space-y-2">
                            {p.features.map((f: string, idx: number) => (
                                <li key={idx} className="text-gray-700 dark:text-gray-300">• {f}</li>
                            ))}
                        </ul>

                        <button className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white">
                            Thuê ngay
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
