import { getBaseUrl } from "./src/common/config";

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "봄가을",
  titleTemplate: "%s | 봄가을",
  defaultTitle: "봄가을",
  description: "봄가을 개발 블로그",
  canonical: getBaseUrl(),
  openGraph: {
    url: getBaseUrl(),
    title: "봄가을",
    description: "봄가을 개발 블로그",
    // images: [
    //   {
    //     url: "https://og-image.sznm.dev/**springfall**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
    //     alt: "springfall.sznm.dev og-image",
    //   },
    // ],
    site_name: "springfall",
  },
  twitter: {
    handle: "@springfall_cc",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
