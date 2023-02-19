import "@common/globals.css";
import RootClientLayout from "@modules/layout/RootClientLayout";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <RootClientLayout />
      <body>{children}</body>
    </html>
  );
}
