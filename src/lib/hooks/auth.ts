import { anonClient } from "@modules/supabase/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAdminPageGuard() {
  const router = useRouter();

  useEffect(() => {
    const user = anonClient.auth.user();
    if (!user) {
      anonClient.auth.signIn(
        { provider: "github" },
        { redirectTo: window.location.href }
      );
    }
  }, [router]);
}
