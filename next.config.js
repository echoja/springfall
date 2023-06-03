/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    mdxRs: true,
  },

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
        destination: "/article/puss-in-boots",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = require("@next/mdx")({
  // options: {
  //   providerImportSource: "@mdx-js/react",
  // },
});

module.exports = withMDX(withBundleAnalyzer(config));
