import type { MetadataRoute } from "next";
import { i18n } from "@common/config";
import { articleLocales } from "@modules/i18n/available";
import items from "@modules/article/items";

const BASE = process.env.BASE_URL;

if (!BASE) {
  throw new Error("BASE_URL is not defined");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly" },
    { url: `${BASE}/portfolio`, changeFrequency: "monthly" },
  ];

  for (const item of items) {
    const locales = articleLocales[item.slug] ?? [];

    // If there are locales available for the article, add entries for each locale
    if (locales.length > 0) {
      const languages = Object.fromEntries(
        locales.map((l) => [l, `${BASE}/${l}/${item.slug}`]),
      );
      const primaryLocale = locales.includes(i18n.defaultLocale)
        ? i18n.defaultLocale
        : locales[0];
      urls.push({
        url: languages[primaryLocale],
        changeFrequency: "monthly",
        lastModified: item.updatedAt,
        alternates: { languages },
      });
      continue;
    }

    //  Default entry without locale
    urls.push({
      url: `${BASE}/${item.slug}`,
      changeFrequency: "monthly",
      lastModified: item.updatedAt,
    });
  }

  return urls;
}
