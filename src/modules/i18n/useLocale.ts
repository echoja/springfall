"use client";

import { i18n, type Locale } from "@/modules/i18n/types";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, isLocale } from "./util";
import * as cookie from "cookie";

export function useLocale(): Locale {
  const pathname = usePathname();
  const cookies = cookie.parse(document.cookie);
  const localeFromCooikieRaw = cookies.locale || "";
  const localeFromCooikie = isLocale(localeFromCooikieRaw)
    ? localeFromCooikieRaw
    : null;

  return (
    getLocaleFromPathname(pathname) || localeFromCooikie || i18n.defaultLocale
  );
}
