"use client";

import { useEffect } from "react";
import { useColorMode } from "./color-mode";

export default function ColorModeClassNameInjector() {
  const { resolved } = useColorMode();

  useEffect(() => {
    const root = document.documentElement;
    if (resolved === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [resolved]);

  return null;
}
