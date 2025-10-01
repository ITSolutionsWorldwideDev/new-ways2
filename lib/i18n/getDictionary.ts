// lib/i18n/getDictionary.ts
import type { Locale } from "./settings";

export const getDictionary = async (locale: Locale) =>
  import(`./locales/${locale}/common.json`).then((module) => module.default);
