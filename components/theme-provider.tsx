"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      // defaultTheme="dark"
      defaultTheme="light" // set global default to light
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
