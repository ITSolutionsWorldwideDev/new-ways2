// lib/getDictionary.ts
import { type Locale } from "./i18n-config";


export const getDictionary = async (locale: Locale) =>
  import(`./locales/${locale}/common.json`).then((module) => module.default);

/* export const getDictionary = async (locale: Locale) => {
  const dict = await import(`@/dictionaries/${locale}.json`);
  return dict.default;
}; */
