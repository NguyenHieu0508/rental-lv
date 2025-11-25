"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
};

export function ThemeProvider({
    children,
    attribute = "class",
    defaultTheme = "light",
    enableSystem = true,
}: Props) {
    return (
        <NextThemesProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
        >
            {children}
        </NextThemesProvider>
    );
}
