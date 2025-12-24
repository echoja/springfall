import type { Locale } from "@/modules/i18n/types";
import { i18n } from "@/modules/i18n/types";

export function getLocaleFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(first) ? first : null;
}

export function isLocale(x: string): x is Locale {
  return (i18n.locales as readonly string[]).includes(x);
}
