import { anonClient } from "@lib/supabase";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import type { AsyncReturnType } from "type-fest";

export function useAdminPageGuard() {
  const router = useRouter();

  const onSignInSuccess = useCallback(
    (value: AsyncReturnType<typeof anonClient.auth.signIn>) => {
      if (value.url) {
        router.replace(value.url);
      }
    },
    [router]
  );

  useEffect(() => {
    const user = anonClient.auth.user();
    if (!user) {
      anonClient.auth.signIn({ provider: "github" }).then(onSignInSuccess);
    }
  }, [onSignInSuccess, router]);
}
