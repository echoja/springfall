import type { MetadataRoute } from "next";

const base = process.env.BASE_URL;
if (!base) {
  throw new Error("BASE_URL is not defined");
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
