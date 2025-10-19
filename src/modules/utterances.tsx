"use client";

import { useEffect, useRef, useState } from "react";

import { DEFAULT_UTTERANCES_REPO, getUtterancesRepo } from "@common/config";

import { useColorMode } from "./color-mode/color-mode";

const Utterances = () => {
  const { resolved } = useColorMode();
  const [lightRef, setLightRef] = useState<HTMLDivElement | null>(null);
  const [darkRef, setDarkRef] = useState<HTMLDivElement | null>(null);
  const loaded = useRef(false);

  // Inject both iframes once
  useEffect(() => {
    const repo = getUtterancesRepo();
    if (loaded.current) return;
    if (!lightRef || !darkRef) return;
    if (repo === DEFAULT_UTTERANCES_REPO) return;

    const add = (
      container: HTMLDivElement,
      theme: "github-light" | "github-dark",
    ) => {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("repo", repo);
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", theme);
      container.appendChild(script);
      return script;
    };

    const sLight = add(lightRef, "github-light");
    const sDark = add(darkRef, "github-dark");
    loaded.current = true;

    return () => {
      sLight.remove();
      sDark.remove();
      [lightRef, darkRef].forEach((c) => {
        if (!c) return;
        while (c.firstChild) c.removeChild(c.firstChild);
      });
      loaded.current = false;
    };
  }, [lightRef, darkRef]);

  const isDark = resolved === "dark";

  return (
    <>
      <div ref={setLightRef} style={{ display: isDark ? "none" : "block" }} />
      <div ref={setDarkRef} style={{ display: isDark ? "block" : "none" }} />
    </>
  );
};

export default Utterances;
