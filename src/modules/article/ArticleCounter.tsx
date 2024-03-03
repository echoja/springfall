"use client";

import { useColorMode } from "@modules/color-mode/color-mode";
import { twMerge } from "tailwind-merge";

export default function ArticleCounter({ className }: { className?: string }) {
  const { colorMode } = useColorMode();

  const color = colorMode === "dark" ? "rgb(156 163 175)" : "rgb(107 114 128)";

  return (
    <span className={twMerge("flex items-center gap-0.5", className)}>
      <img
        src={`https://pageview-counter.springfall.workers.dev/api/counter.svg?color=${color}&size=12`}
        alt="counter"
      />
      <span>views</span>
    </span>
  );
}
