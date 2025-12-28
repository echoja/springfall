"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "./util";
import { i18n } from "./types";

const HtmlLangUpdater = () => {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname);
    document.documentElement.lang = locale ?? i18n.defaultLocale;
  }, [pathname]);

  return null;
};

export default HtmlLangUpdater;
