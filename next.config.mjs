import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import remarkDirectiveRehype from "remark-directive-rehype";

/** @type {import('next').NextConfig} */
const config = {
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

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkDirectiveRehype],
  },
});

export default withMDX(withBundleAnalyzer(config));
