import "@code-hike/mdx/dist/index.css";
import "@common/globals.css";
import type { Metadata } from "next";

import Footer from "@modules/layout/Footer";
import RootClientLayout from "@modules/layout/RootClientLayout";
import { metadataBase } from "@modules/metadata/constants";
import { Providers } from "./providers";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
<script>
(function (co,de,n,but,t,e,r){!n[co]&&(n[co]=function(){
(n[co].q=n[co].q||[]).push(arguments);});e=t.createElement(but);
e.async=true;e.src=de;r=t.getElementsByTagName(but)[0];
r.parentNode.insertBefore(e, r);
})("CodenButter", "https://buttr.dev/butter.js", window, "script", document);
window.CodenButter("boot", { siteId: "otoyyikrrj", auto: true });
</script>`,
          }}
        ></script>
      </head>
      <RootClientLayout />
      <body>
        <Providers>
          <div className="max-w-screen-md mx-auto">
            <div className="p-4 md:p-8 sm:p-6">
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
