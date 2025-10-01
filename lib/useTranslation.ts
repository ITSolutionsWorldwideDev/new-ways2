// lib/useTranslation.ts
import { useContext } from "react";

export function useTranslation(dictionary: Record<string, any>) {
  return function t(key: string) {
    return key.split(".").reduce((acc, part) => acc?.[part], dictionary) || key;
  };
}


/* 

const t = useTranslation(dictionary);
<p>{t("nav.home")}</p>
*/