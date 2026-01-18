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

  // 1. pathname에서 locale 추출 (예: /ko/article/..., /en/article/...)
  const localeFromPathname = getLocaleFromPathname(pathname);
  if (localeFromPathname) {
    return localeFromPathname;
  }

  // 2. /article/... 경로는 기존 한국어 콘텐츠이므로 쿠키 무시하고 기본 locale 사용
  if (pathname.startsWith("/article/")) {
    return i18n.defaultLocale;
  }

  // 3. 그 외의 경우 쿠키 확인 후 기본 locale 반환
  const localeFromCookie = getLocaleFromCookie();
  return localeFromCookie || i18n.defaultLocale;
}
