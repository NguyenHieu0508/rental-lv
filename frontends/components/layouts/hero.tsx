export default function Hero() {
    return (
        <section className="w-full h-[80vh] bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: "url('/banner-car.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-3xl text-center px-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    Thuê Xe Dễ Dàng – Nhanh Chóng – Giá Tốt
                </h1>
                <p className="text-gray-200 text-lg mt-4 drop-shadow">
                    Nền tảng thuê xe thông minh cho doanh nghiệp & cá nhân.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/auth"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition"
                    >
                        Bắt đầu ngay
                    </a>
                    <a
                        href="/cars"
                        className="px-6 py-3 bg-white/90 hover:bg-white text-black rounded-lg shadow-lg transition"
                    >
                        Xem danh sách xe
                    </a>
                </div>
            </div>
        </section>
    );
}
