import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "@common/config";
import { articleLocales } from "@modules/i18n/available";

// Incrementally roll out locale prefixes only for these subpaths
// to avoid breaking existing non-prefixed routes.
const localizedSubpaths = new Set<string>(
  Object.keys(articleLocales).map((k) => `/${k}`),
);

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return i18n.defaultLocale;
  const prefs = acceptLanguage
    .split(",")
    .map((x) => {
      const [tagPart, q] = x.trim().split(";q=");
      const tag = (tagPart ?? "").toLowerCase();
      return { tag, q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of prefs) {
    const exact = i18n.locales.find((l) => l.toLowerCase() === tag);
    if (exact) return exact;
    const base = tag.split("-")[0] as Locale;
    const byBase = i18n.locales.find((l) => l.startsWith(base));
    if (byBase) return byBase;
  }
  return i18n.defaultLocale;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Skip static files, API, and already localized paths
  const seg1 = pathname.split("/")[1] ?? "";
  if (
    pathname.startsWith("/_next") ||
    pathname.match(/\.[^/]+$/) ||
    seg1 === "api" ||
    seg1 === "set-locale" ||
    (i18n.locales as readonly string[]).includes(seg1)
  ) {
    return NextResponse.next();
  }

  // Only enforce locale prefix for whitelisted subpaths (incremental rollout)
  const match = Array.from(localizedSubpaths).find(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (!match) return NextResponse.next();

  const cookieLocale = (req.cookies.get("locale")?.value || undefined) as
    | Locale
    | undefined;
  const detected =
    cookieLocale ?? pickLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${detected}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/(.*)"] };
