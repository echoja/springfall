import { NextResponse } from "next/server";
import { i18n, type Locale } from "@common/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") as Locale | null;
  const to = searchParams.get("to") || "/";

  if (!locale || !(i18n.locales as readonly string[]).includes(locale)) {
    return NextResponse.redirect(new URL(to, req.url));
  }

  const res = NextResponse.redirect(new URL(to, req.url));
  res.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1y
    sameSite: "lax",
  });
  return res;
}
