"use client";

import { i18n, type Locale } from "@/modules/i18n/types";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, isLocale } from "./util";
import * as cookie from "cookie";

function getLocaleFromCookie(): Locale | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = cookie.parse(document.cookie);
  const localeRaw = cookies.locale || "";
  return isLocale(localeRaw) ? localeRaw : null;
}

export function useLocale(): Locale {
  const pathname = usePathname();
  const localeFromCooikie = getLocaleFromCookie();

  return (
    getLocaleFromPathname(pathname) || localeFromCooikie || i18n.defaultLocale
  );
}
