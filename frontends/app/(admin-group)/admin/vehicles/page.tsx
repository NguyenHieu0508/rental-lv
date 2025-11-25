"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useVehicles } from "@/hooks/useVehicle";
import { vehicleService } from "@/services/vehicle.service";
import VehicleModal from "./_components/vehicle-modal";

export default function VehiclePage() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const queryClient = useQueryClient();

    const { data: vehicles = [] } = useVehicles(search);

    return (
        <div className="p-4 text-gray-200">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Vehicles</h1>
                <button
                    onClick={() => {
                        setSelected(null);
                        setOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    + Add Vehicle
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
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">License Plate</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Branch</th>
                        <th className="p-3 text-left">Price List</th>
                        <th className="p-3 text-left pl-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((v: any) => {
                        const thumb = v.photos?.[0];

                        return (
                            <tr key={v.id} className="border-b border-slate-700 hover:bg-slate-800">

                                {/* Thumbnail image */}
                                <td className="p-3">
                                    {thumb ? (
                                        <img
                                            src={thumb}
                                            className="w-14 h-10 object-cover rounded border border-slate-700"
                                        />
                                    ) : (
                                        <div className="w-14 h-10 bg-slate-700 rounded flex items-center justify-center text-xs text-gray-400">
                                            N/A
                                        </div>
                                    )}
                                </td>

                                <td className="p-3">{v.name}</td>
                                <td className="p-3">{v.licensePlate}</td>
                                <td className="p-3">{v.category?.name}</td>
                                <td className="p-3">{v.branch?.name}</td>
                                <td className="p-3">{v.priceList?.name}</td>

                                <td className="p-3 text-left pl-4">
                                    <button
                                        className="text-blue-400 mr-3"
                                        onClick={() => {
                                            setSelected(v);
                                            setOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-400"
                                        onClick={async () => {
                                            if (!confirm("Delete this vehicle?")) return;
                                            await vehicleService.delete(v.id);
                                            queryClient.invalidateQueries(["vehicles"]);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {open && (
                <VehicleModal
                    selected={selected}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}
