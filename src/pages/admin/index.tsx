import { wrapAdminLayout } from "@lib/components/layout/AdminLayout";
import { useAdminPageGuard } from "@lib/hooks";
import type { Post } from "@prisma/client";

interface IPagesProps {
  feed: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export default function Admin({ feed: _feed }: IPagesProps) {
  useAdminPageGuard();
  return <div>hello admin!</div>;
}

Admin.wrap = wrapAdminLayout;
