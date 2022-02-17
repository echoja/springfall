/** @type {import('next').NextConfig} */
const config = {
  webpack: (config, { defaultLoaders, isServer }) => {

    // thx  https://github.com/prisma/prisma/issues/6899#issuecomment-849126557
    // prisma _http_common require 문제 임시조치. 문제 해결시 삭제 요망
    if (isServer) {
      config.externals.push("_http_common");
    }
    // -----------------=============
    return config;
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
};

module.exports = config;
