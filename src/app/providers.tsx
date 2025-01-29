// app/providers.tsx
"use client";

import { store } from "@modules/color-mode/color-mode";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  return (
    <NextUIProvider navigate={navigate} locale="ko-KR">
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </NextUIProvider>
  );
}
