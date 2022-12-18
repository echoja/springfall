import type { LayoutWrapper } from "@modules/content/types";

import useAdminAuth from "../auth/use-admin-auth";

const AdminNoLayoutWrapper: LayoutWrapper = ({ children: page }) => {
  useAdminAuth();

  return <div>{page}</div>;
};

export default AdminNoLayoutWrapper;
