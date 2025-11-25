/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center
                 w-12 h-12 rounded-full bg-black/80 dark:bg-white/80
                 text-white dark:text-black shadow-lg hover:scale-110
                 transition-all duration-200"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
