import { i18n, type Locale } from "@common/config";

export function isLocale(x: string): x is Locale {
  return (i18n.locales as readonly string[]).includes(x);
}
