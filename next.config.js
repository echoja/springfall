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
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX(withBundleAnalyzer(config));
