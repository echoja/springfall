import supabase from "@lib/supabase";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import type { AsyncReturnType } from "type-fest";

export function useAdminPageGuard() {
  const router = useRouter();

  const onSignInSuccess = useCallback(
    (value: AsyncReturnType<typeof supabase.auth.signIn>) => {
      if (value.url) {
        router.replace(value.url);
      }
    },
    [router]
  );

  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      supabase.auth.signIn({ provider: "github" }).then(onSignInSuccess);
    }
  }, [onSignInSuccess, router]);
}
