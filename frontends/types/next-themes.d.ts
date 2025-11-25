/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "next-themes" {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    forcedTheme?: string;
    disableTransitionOnChange?: boolean;
    enableSystem?: boolean;
    storageKey?: string;
    themes?: string[];
    value?: string;
  }

  export const ThemeProvider: (props: ThemeProviderProps) => JSX.Element;
  export const useTheme: any;
}
