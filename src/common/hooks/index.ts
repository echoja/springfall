import { useRouter } from "next/router";
import { useCallback } from "react";

export * from "./auth";

export function useRouterRefresh() {
  const { asPath, replace } = useRouter();

  return useCallback(() => replace(asPath), [asPath, replace]);
}
