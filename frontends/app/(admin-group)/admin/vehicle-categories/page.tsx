"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vehicleCategoryService } from "@/services/vehicle-category.service";
import { useState } from "react";
import CategoryModal from "./_component/category-modal";

export default function VehicleCategoryPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const { data: categories = [] } = useQuery({
        queryKey: ["vehicle-categories", search],
        queryFn: () => vehicleCategoryService.getAll(search),
    });

    return (
        <div className="p-4">

            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Vehicle Categories</h1>

                <button
                    onClick={() => { setSelected(null); setOpen(true); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Category
                </button>
            </div>

            <input
                placeholder="Search..."
                className="border p-2 rounded w-60 mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full shadow rounded">
                <thead>
                    <tr>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Code</th>
                        <th className="text-left p-3">Description</th>
                        <th className="text-left p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((item: any) => (
                        <tr key={item.id} className="border-b">
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.code}</td>
                            <td className="p-3">{item.description}</td>

                            <td className="p-3">
                                {item.isActive ? (
                                    <span className="text-green-400">Active</span>
                                ) : (
                                    <span className="text-red-400">Inactive</span>
                                )}
                            </td>

                            <td className="p-3 text-center">
                                <button
                                    className="text-blue-400 mr-3"
                                    onClick={() => { setSelected(item); setOpen(true); }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="text-red-400"
                                    onClick={async () => {
                                        if (!confirm("Delete this item?")) return;
                                        await vehicleCategoryService.delete(item.id);
                                        queryClient.invalidateQueries(["vehicle-categories"]);
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
                <CategoryModal
                    open={open}
                    selected={selected}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}
