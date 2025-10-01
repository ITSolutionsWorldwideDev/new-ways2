// lib/i18n-config.ts
export const languages = ["en", "de", "es"] as const;
export type Locale = (typeof languages)[number];

export const defaultLocale: Locale = "en";
