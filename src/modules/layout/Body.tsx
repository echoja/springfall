"use client";

import { useColorMode } from "@modules/color-mode/color-mode";

export default function Body({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();
  const className = colorMode === "light" ? "light" : "dark";

  return <body className={className}>{children}</body>;
}
