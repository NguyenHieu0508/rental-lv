"use client";

import { useRegister } from "@/hooks/auth/use-auth";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterFormProps {
    onChangeView: (view: "login" | "register" | "forgot") => void;
}

export default function RegisterForm({ onChangeView }: RegisterFormProps) {
    const registerMutation = useRegister();

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = () => {
        // Validation
        if (!form.email || !form.password || !form.name) {
            toast.error("Please fill all fields");
            return;
        }

        if (!validateEmail(form.email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        registerMutation.mutate(form, {
            onSuccess: () => {
                toast.success("Account created successfully! Please login");
                onChangeView("login");
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || err?.message || "Registration failed");
            },
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-fuchsia-600/30 via-purple-500/20 to-cyan-300/20 blur-2xl opacity-70 pointer-events-none" />

            <div className="relative z-10 p-6 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)]">
                <h1 className="text-3xl font-extrabold mb-6 text-center bg-linear-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                    Create Account
                </h1>

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-200 mb-1 block">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                            placeholder="your@email.com"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onKeyPress={handleKeyPress}
                            disabled={registerMutation.isPending}
                        />
                    </div>

                    {/* Full name */}
                    <div>
                        <label className="text-sm text-gray-200 mb-1 block">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                            placeholder="John Doe"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onKeyPress={handleKeyPress}
                            disabled={registerMutation.isPending}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-200 mb-1 block">
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            onKeyPress={handleKeyPress}
                            disabled={registerMutation.isPending}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Minimum 6 characters
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={registerMutation.isPending}
                    className="mt-6 w-full py-3 rounded-lg bg-linear-to-r from-fuchsia-600 to-cyan-500 text-white font-bold hover:scale-[1.03] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {registerMutation.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <p
                    onClick={() => !registerMutation.isPending && onChangeView("login")}
                    className="mt-6 text-center text-gray-300 hover:text-cyan-300 cursor-pointer transition-colors"
                >
                    Already have an account? <span className="font-semibold">Login</span>
                </p>
            </div>

            <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-fuchsia-600/40 via-purple-500/30 to-cyan-400/40 blur-3xl" />
        </div>
    );
}