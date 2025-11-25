"use client";

import { useState, useEffect } from "react";

export default function GlobalLoading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(t);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="loader border-t-blue-500"></div>
        </div>
    );
}
