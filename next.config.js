/** @type {import('next').NextConfig} */
const config = {
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
        source: "/admin/post/list",
        destination: "/admin/post/list/1",
        permanent: true,
      },
      {
        source: "/post/list",
        destination: "/post/list/1",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(config);
