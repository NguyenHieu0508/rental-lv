"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotForm from "./forgot-form";

export default function AuthView() {
    const [view, setView] = useState<"login" | "register" | "forgot">("login");

    const COMPONENT = {
        login: <LoginForm onChangeView={setView} />,
        register: <RegisterForm onChangeView={setView} />,
        forgot: <ForgotForm onChangeView={setView} />,
    };

    return (
        <div className="w-[420px] p-0 relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                >
                    {COMPONENT[view]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}