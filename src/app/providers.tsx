// app/providers.tsx
"use client";

import { store } from "@modules/color-mode/color-mode";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as JotaiProvider } from "jotai";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <GoogleAnalytics trackPageViews />
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </NextUIProvider>
  );
}
