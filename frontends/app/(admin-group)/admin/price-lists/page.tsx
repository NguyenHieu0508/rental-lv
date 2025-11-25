"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePriceLists } from "@/hooks/usePriceList";
import { priceListService } from "@/services/price-list.service";
import PriceListModal from "./_components/pricelist-modal";
import { useFormatVND } from "@/hooks/useFormatVND";

export default function PriceListPage() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const queryClient = useQueryClient();

    const { data: priceLists = [] } = usePriceLists(search);
    const { formatVND } = useFormatVND();

    return (
        <div className="p-4 text-gray-200">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Price Lists</h1>
                <button
                    onClick={() => {
                        setSelected(null);
                        setOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    + Add Price List
                </button>
            </div>

            <input
                placeholder="Search..."
                className="bg-slate-800 border border-slate-700 text-gray-200 p-2 rounded w-60 mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full bg-slate-900 border border-slate-700 rounded shadow">
                <thead className="bg-slate-800 border-b border-slate-700 text-gray-300">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Daily</th>
                        <th className="p-3 text-left">Hourly</th>
                        <th className="p-3 text-left">Weekend</th>
                        <th className="p-3 text-left pl-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {priceLists.map((p: any) => (
                        <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-800">
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">{formatVND(p.dailyRate)}</td>
                            <td className="p-3">{p.hourlyRate ? formatVND(p.hourlyRate) : "-"}</td>
                            <td className="p-3">{p.weekendRate ? formatVND(p.weekendRate) : "-"}</td>

                            <td className="p-3 text-left pl-4">
                                <button
                                    className="text-blue-400 mr-3"
                                    onClick={() => {
                                        setSelected(p);
                                        setOpen(true);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="text-red-400"
                                    onClick={async () => {
                                        if (!confirm("Delete this price list?")) return;
                                        await priceListService.delete(p.id);
                                        queryClient.invalidateQueries(["price-lists"]);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {open && (
                <PriceListModal
                    open={open}
                    selected={selected}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}
