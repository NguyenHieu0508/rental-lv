"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { branchService } from "@/services/branch.service";
import { useState } from "react";
import BranchModal from "./_components/branch-modal";

export default function BranchPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const { data: branches = [] } = useQuery({
        queryKey: ["branches", search],
        queryFn: () => branchService.getAll(search),
    });

    return (
        <div className="p-4 text-gray-200">

            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Branches</h1>

                <button
                    onClick={() => { setSelected(null); setOpen(true); }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    + Add Branch
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
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Code</th>
                        <th className="text-left p-3">Address</th>
                        <th className="text-left p-3">City</th>
                        <th className="text-left p-3">Phone</th>
                        <th className="text-left p-3">Status</th>
                        <th className="p-3 text-left pl-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {branches.map((item: any) => (
                        <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-800">
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.code}</td>
                            <td className="p-3">{item.address}</td>
                            <td className="p-3">{item.city}</td>
                            <td className="p-3">{item.phone}</td>
                            <td className="p-3">
                                {item.isActive ? (
                                    <span className="text-green-400">Active</span>
                                ) : (
                                    <span className="text-red-400">Inactive</span>
                                )}
                            </td>

                            <td className="p-3 text-left pl-4">
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
                                        await branchService.delete(item.id);
                                        queryClient.invalidateQueries(["branches"]);
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
                <BranchModal
                    open={open}
                    selected={selected}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}
