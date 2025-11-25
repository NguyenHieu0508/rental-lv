/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useFormSubmit } from "@/hooks/useHooks";
import { vehicleService } from "@/services/vehicle.service";
import { branchService } from "@/services/branch.service";
import { priceListService } from "@/services/price-list.service";
import { vehicleCategoryService } from "@/services/vehicle-category.service";

type VehicleModalProps = {
    selected?: any;
    onClose: () => void;
};

export default function VehicleModal({ selected, onClose }: VehicleModalProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [branches, setBranches] = useState<any[]>([]);
    const [priceLists, setPriceLists] = useState<any[]>([]);
    const [newPhotos, setNewPhotos] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);

    const defaultValues = {
        name: "",
        licensePlate: "",
        brand: "",
        model: "",
        year: undefined as any,
        color: "",
        status: "AVAILABLE",
        categoryId: "",
        branchId: "",
        priceListId: "",
    };

    const { register, handleSubmit: formHandle, reset } = useForm({
        defaultValues,
    });

    /** RESET FORM */
    useEffect(() => {
        reset(selected ?? defaultValues);
    }, [selected, reset]);

    /** RESET PHOTO */
    useEffect(() => {
        setNewPhotos([]);
        setPreview([]);
    }, [selected]);

    /** Load dropdowns */
    useEffect(() => {
        vehicleCategoryService.getAll().then(setCategories);
        branchService.getAll().then(setBranches);
        priceListService.getAll().then(setPriceLists);
    }, []);

    /** Submit */
    const { handleSubmit, isPending } = useFormSubmit(
        async (data: any) => {
            let mergedPhotos = selected?.photos ?? [];

            if (newPhotos.length > 0) {
                const res = await vehicleService.uploadPhotos(newPhotos);
                mergedPhotos = [...mergedPhotos, ...res.urls];
            }

            const payload = {
                ...data,
                year: data.year ? Number(data.year) : undefined,
                photos: mergedPhotos,
            };

            return selected
                ? vehicleService.update(selected.id, payload)
                : vehicleService.create(payload);
        },
        ["vehicles"]
    );

    const onSubmit = async (data: any) => {
        await handleSubmit(data);
        onClose();
    };

    /** Select new images */
    const onSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setNewPhotos(files as File[]);
        setPreview(files.map((f) => URL.createObjectURL(f)));
    };

    const hasOldPhotos = Array.isArray(selected?.photos) && selected.photos.length > 0;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 p-6 w-[520px] rounded-2xl shadow-xl text-gray-200 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {selected ? "Edit Vehicle" : "Add Vehicle"}
                </h2>

                <form onSubmit={formHandle(onSubmit)} className="space-y-4">

                    {/* BASIC */}
                    <Section title="Basic Information">
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Name" register={register("name")} placeholder="Honda City" />
                            <Input label="License Plate" register={register("licensePlate")} placeholder="51A-123.45" />
                            <Input label="Brand" register={register("brand")} placeholder="Toyota" />
                            <Input label="Model" register={register("model")} placeholder="Vios" />
                            <Input label="Year" type="number" register={register("year")} placeholder="2022" />
                            <Input label="Color" register={register("color")} placeholder="Black" />

                            <div className="col-span-2">
                                <label className="text-xs text-slate-400 mb-1 block">Status</label>
                                <select {...register("status")} className="input-dark">
                                    <option value="AVAILABLE">Available</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                    <option value="UNAVAILABLE">Unavailable</option>
                                </select>
                            </div>
                        </div>
                    </Section>

                    {/* DROPDOWNS */}
                    <Section title="Category • Branch • Price List">
                        <Select label="Category" register={register("categoryId")} options={categories} />
                        <Select label="Branch" register={register("branchId")} options={branches} />
                        <Select label="Price List" register={register("priceListId")} options={priceLists} />
                    </Section>

                    {/* PHOTOS */}
                    <Section title="Photos">
                        {hasOldPhotos && (
                            <>
                                <p className="text-xs text-slate-400 mb-1">Existing photos</p>
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {selected.photos.map((src: string, i: number) => (
                                        <img key={i} src={src} className="w-full h-20 object-cover rounded border border-slate-700" />
                                    ))}
                                </div>
                            </>
                        )}

                        <label className="block text-gray-300 text-sm">
                            Upload new photos
                            <input type="file" multiple accept="image/*" className="mt-1 text-xs" onChange={onSelectFiles} />
                        </label>

                        {preview.length > 0 && (
                            <>
                                <p className="text-xs text-slate-400 mt-2 mb-1">New photos</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {preview.map((src, i) => (
                                        <img key={i} src={src} className="w-full h-20 object-cover rounded border border-slate-700" />
                                    ))}
                                </div>
                            </>
                        )}
                    </Section>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-600 text-gray-300 rounded hover:bg-slate-700">
                            Cancel
                        </button>
                        <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50">
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, children }: any) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">{title}</h3>
            {children}
        </div>
    );
}

function Input({ label, register, ...props }: any) {
    return (
        <div>
            <label className="text-xs text-slate-400 mb-1 block">{label}</label>
            <input {...register} {...props} className="input-dark" />
        </div>
    );
}

function Select({ label, register, options }: any) {
    return (
        <div>
            <label className="text-xs text-slate-400 mb-1 block">{label}</label>
            <select {...register} className="input-dark">
                <option value="">Select {label}</option>
                {options.map((x: any) => (
                    <option key={x.id} value={x.id}>{x.name}</option>
                ))}
            </select>
        </div>
    );
}
