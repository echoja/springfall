import type { LayoutWrapper } from "@modules/content/types";
import Link from "next/link";

import useAdminAuth from "./useAdminAuth";

const AdminLayoutWrapper: LayoutWrapper = ({ page }) => {
  useAdminAuth();

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