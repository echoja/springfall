import remarkCustomContainer from "@echoja/remark-custom-container";
import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const config = {
  /** mdxRS 로 하면 `remarkPlugins` 가 먹히지 않음.  */
  // experimental: {
  //   mdxRs: true,
  // },

  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    domains: [
      "s3.ap-northeast-2.amazonaws.com",
      process.env.NEXT_PUBLIC_SUPABASE_URL.split("://")[1],
    ],
  },

  async redirects() {
    return [
      {
        source: "/post/10",
        destination: "/article/2023-02/puss-in-boots",
        permanent: true,
      },
    ];
  },

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("@echoja/remark-custom-container").CustomContainerOptions }*/
const customContainerOptions = {
  optionsByClassName: [
    {
      selector: "details",
      containerTag: "details",
      titleTag: "summary",
    },
  ],
};

const withMDX = mdx({
  options: {
    remarkPlugins: [[remarkCustomContainer, customContainerOptions], remarkGfm],
  },
});

export default withMDX(withBundleAnalyzer(config));
