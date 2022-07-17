import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import { useAdminPageGuard } from "@lib/hooks";
import type { MonnomlogPage } from "@modules/content/types";
import type { Post } from "@prisma/client";

interface IPagesProps {
  feed: (Post & {
    author: {
      name: string | null;
    } | null;
  })[];
}

export const Admin: MonnomlogPage<IPagesProps> = ({ feed: _feed }) => {
  useAdminPageGuard();
  return <div>hello admin!</div>;
};

Admin.layoutWrapper = adminLayoutWrapper;

export default Admin;
