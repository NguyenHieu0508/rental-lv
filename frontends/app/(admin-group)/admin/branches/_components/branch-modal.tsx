"use client";

import { useForm } from "react-hook-form";
import { useFormSubmit } from "@/hooks/useHooks";
import { branchService } from "@/services/branch.service";

interface BranchModalProps {
    open: boolean;
    selected?: any;
    onClose: () => void;
}

export default function BranchModal({ open, selected, onClose }: BranchModalProps) {

    const { register, handleSubmit: formHandle } = useForm({
        defaultValues: selected ?? {
            name: "",
            code: "",
            address: "",
            city: "",
            country: "",
            phone: "",
            isActive: true,
        },
    });

    const { handleSubmit, isPending } = useFormSubmit(
        (data: any) =>
            selected
                ? branchService.update(selected.id, data)
                : branchService.create(data),
        ["branches"]
    );

    const onSubmit = async (data: any) => {
        await handleSubmit(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 p-6 w-96 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 text-gray-200">
                    {selected ? "Edit Branch" : "Add Branch"}
                </h2>

                <form onSubmit={formHandle(onSubmit)} className="space-y-3">

                    <input {...register("name")} className="input-dark" placeholder="Name" />
                    <input {...register("code")} className="input-dark" placeholder="Code" />
                    <input {...register("address")} className="input-dark" placeholder="Address" />
                    <input {...register("city")} className="input-dark" placeholder="City" />
                    <input {...register("country")} className="input-dark" placeholder="Country" />
                    <input {...register("phone")} className="input-dark" placeholder="Phone" />

                    <label className="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" {...register("isActive")} />
                        Active
                    </label>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-600 text-gray-300 rounded hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
