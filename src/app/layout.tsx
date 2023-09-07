import "@code-hike/mdx/dist/index.css";
import "@common/globals.css";
import type { Metadata } from "next";

import Footer from "@modules/layout/Footer";
import Header from "@modules/layout/Header";
import RootClientLayout from "@modules/layout/RootClientLayout";
import { metadataBase } from "@modules/metadata";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "봄가을",
    template: "%s | 봄가을",
  },
  icons: {
    icon: "/icons8-spa-flower-96.png",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@springfall_cc",
  },
  other: {
    "naver-site-verification": "392b57225ecb015316d43c362eb6871db10ff17f",
  },
};

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
      <body>
        <div className="max-w-screen-md mx-auto">
          <div className="p-4 md:p-8 sm:p-6">
            <Header />
            <main className="mt-12 mb-24">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
