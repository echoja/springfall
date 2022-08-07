import type { LayoutWrapper } from "@modules/content/types";
import { anonClient } from "@modules/supabase/supabase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminLayoutWrapper: LayoutWrapper = ({ page }) => {
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

  useEffect(() => {
    const { data, error } = anonClient.auth.onAuthStateChange(
      (event, session) => {
        // 관리자 하드 코딩. TODO: 클라이언트에서 검사하는 거라 한계가 있으므로 수정 필요
        if (session?.user && session.user.email !== "eszqsc112@gmail.com") {
          anonClient.auth.signOut();
          router.replace("/404");
          return;
        }

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

  return (
    <div className="flex mx-auto">
      <div className="w-64 p-8">
        <h2 className="text-lg font-bold">관리자</h2>
        <hr className="mt-3 mb-4" />
        <Link href="/admin/post/list">
          <a>게시글 목록</a>
        </Link>
      </div>
      <main className="flex-1 m-8">{page}</main>
    </div>
  );
};

export default AdminLayoutWrapper;
