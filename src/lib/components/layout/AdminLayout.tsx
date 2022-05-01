import Link from "next/link";
import type { ReactNode } from "react";

export const adminLayoutWrapper = (page: ReactNode) => {
  return (
    <div className="flex mx-auto">
      <div className="p-8 w-64">
        <h2 className="text-lg font-bold">관리자</h2>
        <hr className="mt-3 mb-4" />
        <Link href="/admin/post/list">
          <a>게시글 목록</a>
        </Link>
      </div>
      <main className="m-8 flex-1">{page}</main>
    </div>
  );
};
