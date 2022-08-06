import { useAdminPageGuard } from "@common/hooks";
import type { MonnomlogPage } from "@modules/content/types";
import AdminLayoutWrapper from "@modules/layout/AdminLayout";

export const Admin: MonnomlogPage = () => {
  useAdminPageGuard();
  return <div>어드민 화면입니다.</div>;
};

Admin.layoutWrapper = AdminLayoutWrapper;

export default Admin;
