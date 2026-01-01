"use client";

import { useEffect, useRef } from "react";
import { useColorMode } from "./color-mode/color-mode";
import { useLocale } from "./i18n/useLocale";

const Giscus = () => {
  const { resolved } = useColorMode();
  const loaded = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!containerRef.current || loaded.current) {
      return;
    }

    // Create and inject the giscus script
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "echoja/springfall-comments");
    script.setAttribute("data-repo-id", "R_kgDOIWvdzg");
    script.setAttribute("data-category-id", "DIC_kwDOIWvdzs4C0ctx");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolved === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", locale);
    script.setAttribute("data-loading", "lazy");

    containerRef.current.appendChild(script);
    loaded.current = true;
  }, []);

  // Update theme when color mode changes
  useEffect(() => {
    if (!loaded.current) {
      return;
    }

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolved === "dark" ? "dark" : "light",
              lang: locale,
            },
          },
        },
        "https://giscus.app",
      );
    }
  }, [resolved, locale]);

  return <div className="lg:-translate-x-38" ref={containerRef} />;
};

export default Giscus;
