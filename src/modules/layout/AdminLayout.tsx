import type { LayoutWrapper } from "@modules/content/types";
import { anonClient } from "@modules/supabase/supabase";
import Link from "next/link";
import { useEffect } from "react";

const AdminLayoutWrapper: LayoutWrapper = ({ page }) => {
  useEffect(() => {
    const { data, error } = anonClient.auth.onAuthStateChange(
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
  }, []);

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
