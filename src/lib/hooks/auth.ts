import { useSession } from "next-auth/react";

export function useAdminPageGuard() {
  useSession({
    required: true,
  });
}
