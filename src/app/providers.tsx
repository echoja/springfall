"use client";

import { HeroUIProvider } from "@heroui/react";
import { store } from "@modules/color-mode/color-mode";
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
    <HeroUIProvider navigate={navigate} locale="ko-KR">
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </HeroUIProvider>
  );
}
