"use client";

import { useState, useEffect } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { useFormatVND } from "@/hooks/useFormatVND";

export default function CarSlider() {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const { formatVND } = useFormatVND();

    useEffect(() => {
        vehicleService.getAll().then((data) => {
            const filtered = data.filter(
                (v: any) => v.photos?.length > 0 && v.priceList
            );
            setVehicles(filtered);
        });
    }, []);

    const next = () => {
        if (vehicles.length === 0) return;
        setIndex((prev) => (prev + 1) % vehicles.length);
    };

    const prev = () => {
        if (vehicles.length === 0) return;
        setIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
    };

    if (vehicles.length === 0) {
        return (
            <div className="py-20 text-center text-gray-400">
                Đang tải xe nổi bật...
            </div>
        );
    }

    const car = vehicles[index];
    const photo = car.photos?.[0];
    const price = car.priceList?.dailyRate
        ? formatVND(car.priceList.dailyRate) + " / ngày"
        : "—";

    return (
        <section className="py-20 bg-gray-100 dark:bg-zinc-900">
            <h2 className="text-3xl font-bold text-center mb-10">
                Top xe cho thuê được khách hàng ưa chuộng
            </h2>

            {/* FULL WIDTH SLIDER */}
            <div className="w-full flex items-center justify-center gap-6 px-10">
                {/* Prev Button */}
                <button
                    onClick={prev}
                    className="text-4xl px-4 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                    ‹
                </button>

                <div className="w-full max-w-[1400px] bg-white dark:bg-black rounded-2xl p-6 shadow-lg transition-all duration-300">

                    {/* BIG IMAGE FULL WIDTH */}
                    <img
                        src={photo}
                        className="w-full h-[450px] object-cover rounded-xl"
                        alt={car.name}
                    />

                    <h3 className="text-2xl font-bold mt-6">{car.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg">
                        {price}
                    </p>
                    <button
                        onClick={() => window.location.href = `/cars/${car.id}`}
                        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    >
                        Thuê ngay
                    </button>
                </div>

                {/* Next Button */}
                <button
                    onClick={next}
                    className="text-4xl px-4 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                    ›
                </button>

            </div>
        </section>
    );
}
