// app/providers.tsx
"use client";

import { store } from "@modules/color-mode/color-mode";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import { GoogleAnalytics } from "nextjs-google-analytics";
import type { ComponentProps } from "react";
import { useCallback } from "react";

export function Providers({ children, ...props }: { children: React.ReactNode } & ComponentProps<"div">) {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  return (
    <NextUIProvider {...props} navigate={navigate} locale="ko-KR"  >
      <GoogleAnalytics trackPageViews />
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </NextUIProvider>
  );
}
