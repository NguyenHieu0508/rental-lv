"use client";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/auth-bg.webp')" }}
        >
            {children}
        </div>
    );
}