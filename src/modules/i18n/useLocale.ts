"use client";

import { i18n, type Locale } from "@/modules/i18n/types";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "./util";

/**
 * URL pathname 기반으로 locale을 결정합니다.
 * - /ko/... 또는 /en/... 경로: 해당 locale 사용
 * - 그 외 모든 경로: 기본 locale(ko) 사용
 *
 * 쿠키 기반 locale은 사용하지 않습니다. (일관성 유지)
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname) ?? i18n.defaultLocale;
}
