"use client";

import { store } from "@modules/color-mode/color-mode";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children }: { children: React.ReactNode }) {
  return <JotaiProvider store={store}>{children}</JotaiProvider>;
}
