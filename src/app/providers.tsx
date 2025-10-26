"use client";

import { HeroUIProvider } from "@heroui/react";
import { store } from "@modules/color-mode/color-mode";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { useCallback } from "react";

export function Providers({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<"div">) {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  return (
    <HeroUIProvider navigate={navigate} locale="ko-KR" {...props}>
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </HeroUIProvider>
  );
}
