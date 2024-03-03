"use client";

import { useEffect } from "react";
import { useColorMode } from "./color-mode";

export default function ColorModeClassNameInjector() {
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [colorMode]);

  return null;
}
