import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@modules/auth/use-session";
import { getAnonClient } from "@modules/supabase/supabase";

const useAdminAuth = () => {
  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    if (user === "UNAUTHORIZED") {
      getAnonClient().auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: document.location.href },
      });
      return;
    }

    // 관리자 하드 코딩. TODO: 클라이언트에서 검사하는 거라 한계가 있으므로 수정 필요
    if (user && user.email !== "eszqsc112@gmail.com") {
      router.replace("/404");
    }
  }, [router, user]);
};

export default useAdminAuth;
