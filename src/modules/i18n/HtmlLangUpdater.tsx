"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "./util";

const HtmlLangUpdater = () => {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname);
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
};

export default HtmlLangUpdater;
