import AdminLayout from "@lib/components/layout/AdminLayout";
import { useAdminPageGuard } from "@lib/hooks/auth";
import type { Post } from "@prisma/client";
import type { ReactElement } from "react";

interface IPagesProps {
  feed: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export default function Admin({ feed }: IPagesProps) {
  useAdminPageGuard();
  return <div>hello admin!</div>;
}

Admin.wrap = (page: ReactElement) => {
  return (
    <AdminLayout>
      <h2>ADMIN PAGE</h2>
      {page}
    </AdminLayout>
  );
};
