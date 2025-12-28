"use client";

import { useEffect, useRef } from "react";

import { DEFAULT_GISCUS_REPO, getGiscusRepo } from "@common/config";

import { useColorMode } from "./color-mode/color-mode";

const Giscus = () => {
  const { resolved } = useColorMode();
  const loaded = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const repo = getGiscusRepo();
    if (repo === DEFAULT_GISCUS_REPO) {
      return;
    }
    if (!containerRef.current) {
      return;
    }
    if (loaded.current) {
      return;
    }

    // Create and inject the giscus script
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "");
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolved === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "ko");
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
            },
          },
        },
        "https://giscus.app",
      );
    }
  }, [resolved]);

  return <div className="lg:-translate-x-38" ref={containerRef} />;
};

export default Giscus;
