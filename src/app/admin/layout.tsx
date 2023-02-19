import AdminLayoutWrapper from "@modules/layout/AdminLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
