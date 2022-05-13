/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = config;
