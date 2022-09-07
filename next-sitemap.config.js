/** @type {import('next-sitemap').IConfig} */
const NextSitemapConfig = {
  siteUrl: "https://springfall.cc",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*", "/auth/*"],
};

module.exports = NextSitemapConfig;
