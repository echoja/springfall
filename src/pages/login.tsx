import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Pages() {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    const url = Array.isArray(redirect) ? redirect[0] : redirect ?? "/";
    signIn("github", {
      callbackUrl: url,
    });
  }, [redirect]);

  return <div />;
}
