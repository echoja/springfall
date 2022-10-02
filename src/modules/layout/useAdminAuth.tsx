import { getAnonClient } from "@modules/supabase/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAdminAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const user = getAnonClient().auth.user();
    if (!user) {
      getAnonClient().auth.signIn(
        { provider: "github" },
        { redirectTo: window.location.href }
      );
    }
    // 관리자 하드 코딩. TODO: 클라이언트에서 검사하는 거라 한계가 있으므로 수정 필요
    else if (user && user.email !== "eszqsc112@gmail.com") {
      router.replace("/404");
    }
  }, [router]);

  useEffect(() => {
    const { data, error } = getAnonClient().auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      }
    );
    if (error) {
      // eslint-disable-next-line no-console
      console.error("supabase.auth.onAuthStateChange", error);
    }

    return () => {
      data?.unsubscribe();
    };
  }, [router]);
};

export default useAdminAuth;
