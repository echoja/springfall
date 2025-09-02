/* eslint-disable @next/next/next-script-for-ga */
import "@common/globals.css";
import "../../public/pretendard-variable-gov/pretendardvariable-gov-dynamic-subset.css";
import ColorModeClassNameInjector from "@modules/color-mode/ColorModeClassNameInjector";
import Footer from "@modules/layout/Footer";
import { metadataBase } from "@modules/metadata/constants";
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
    <html lang="ko" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function (co,de,n,but,t,e,r){!n[co]&&(n[co]=function(){
(n[co].q=n[co].q||[]).push(arguments);});e=t.createElement(but);
e.async=true;e.src=de;r=t.getElementsByTagName(but)[0];
r.parentNode.insertBefore(e, r);
})("CodenButter", "https://buttr.dev/butter.js", window, "script", document);
window.CodenButter("boot", { siteId: "otoyyikrrj", auto: true });
`,
          }}
        ></script>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `

  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

  ChannelIO('boot', {
    "pluginKey": "8c19f1cf-ca25-474a-9a4f-6151030823f0"
  });
`,
          }}
        ></script>
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
          <div className="max-w-(--breakpoint-md) mx-auto">
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
