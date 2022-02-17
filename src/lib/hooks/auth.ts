import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function useAdminPageGuard() {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/404");
    },
  });
}
