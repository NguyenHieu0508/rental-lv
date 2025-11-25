"use client";

import { useForm } from "react-hook-form";
import { useFormSubmit } from "@/hooks/useHooks";
import { vehicleCategoryService } from "@/services/vehicle-category.service";

interface CategoryModalProps {
    open: boolean;
    selected?: any;
    onClose: () => void;
}

export default function CategoryModal({ open, selected, onClose }: CategoryModalProps) {
    const { register, handleSubmit: formHandle } = useForm({
        defaultValues: selected ?? {
            name: "",
            code: "",
            description: "",
            isActive: true,
        },
    });

    const { handleSubmit, isPending } = useFormSubmit(
        (data: any) =>
            selected
                ? vehicleCategoryService.update(selected.id, data)
                : vehicleCategoryService.create(data),
        ["vehicle-categories"]
    );

    const onSubmit = async (data: any) => {
        await handleSubmit(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 p-6 w-96 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 text-gray-200">
                    {selected ? "Edit Category" : "Add Category"}
                </h2>

                <form onSubmit={formHandle(onSubmit)} className="space-y-4">

                    <input
                        {...register("name")}
                        className="bg-slate-800 border border-slate-700 text-gray-200 p-2 w-full rounded"
                        placeholder="Name"
                    />

                    <input
                        {...register("code")}
                        className="bg-slate-800 border border-slate-700 text-gray-200 p-2 w-full rounded"
                        placeholder="Code"
                    />

                    <textarea
                        {...register("description")}
                        className="bg-slate-800 border border-slate-700 text-gray-200 p-2 w-full rounded h-24"
                        placeholder="Description"
                    />

                    {/* STATUS CHECKBOX */}
                    <label className="flex items-center gap-2 text-gray-200">
                        <input
                            type="checkbox"
                            {...register("isActive")}
                            className="w-4 h-4"
                        />
                        Active
                    </label>

                    <div className="flex justify-end gap-3 pt-3">
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
