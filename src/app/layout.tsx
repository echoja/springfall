import "@common/globals.css";
import "../../public/pretendard-variable-gov/pretendardvariable-gov-dynamic-subset.css";
import ColorModeClassNameInjector from "@modules/color-mode/ColorModeClassNameInjector";
import Footer from "@modules/layout/Footer";
import { metadataBase } from "@modules/metadata/constants";
import { i18n } from "@/modules/i18n/types";
import HtmlLangUpdater from "@modules/i18n/HtmlLangUpdater";
// import "codehike/mdx/dist/index.css";
import type { Metadata } from "next";
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
    <html lang={i18n.defaultLocale} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash: set class before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
;(() => {
  try {
    const key = 'colorMode';
    const stored = localStorage.getItem(key);
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    const resolved = mode === 'system' ? (sysDark ? 'dark' : 'light') : mode;
    const root = document.documentElement;
    if (resolved === 'dark') { root.classList.add('dark'); root.classList.remove('light'); }
    else { root.classList.add('light'); root.classList.remove('dark'); }
  } catch {}
})();
`,
          }}
        />
        {/* GTM */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          ></script>
        ) : null}
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        ) : null}

        <Providers>
          <ColorModeClassNameInjector />
          <HtmlLangUpdater />
          <div className="mx-auto max-w-(--breakpoint-md)">
            <div className="p-4 sm:p-6 md:p-8">
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
