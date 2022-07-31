import { adminLayoutWrapper } from "@lib/components/layout/AdminLayout";
import { useAdminPageGuard } from "@lib/hooks";
import type { MonnomlogPage } from "@modules/content/types";

export const Admin: MonnomlogPage = () => {
  useAdminPageGuard();
  return <div>어드민 화면입니다.</div>;
};

Admin.layoutWrapper = adminLayoutWrapper;

export default Admin;
