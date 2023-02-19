import type { Session } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { getAnonClient } from "@modules/supabase/supabase";

const sessionAtom = atom<Session | null | "UNAUTHORIZED">(null);

export function useUpdateSession() {
  const [_, setSession] = useAtom(sessionAtom);

  const handleSession = useCallback(
    (session: Session | null) => {
      if (!session) {
        setSession("UNAUTHORIZED");
        return;
      }
      setSession(session);
    },
    [setSession]
  );

  useEffect(() => {
    getAnonClient()
      .auth.getSession()
      .then(({ data: { session } }) => {
        handleSession(session);
      });

    const {
      data: { subscription },
    } = getAnonClient().auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [handleSession]);
}

export function useSession() {
  const [session] = useAtom(sessionAtom);

  return session;
}

export function useUser() {
  const session = useSession();
  if (session === "UNAUTHORIZED") {
    return "UNAUTHORIZED";
  }
  return session?.user ?? null;
}
