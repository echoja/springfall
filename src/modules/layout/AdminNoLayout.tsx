import useAdminAuth from "../auth/use-admin-auth";
import type { LayoutWrapper } from "@modules/content/types";

const AdminNoLayoutWrapper: LayoutWrapper = ({ children: page }) => {
  useAdminAuth();

  return <div>{page}</div>;
};

export default AdminNoLayoutWrapper;
