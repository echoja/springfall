import { i18n } from "@common/config";
import { articleLocales } from "@modules/i18n/available";
import { describe, expect, test, vi } from "vitest";

describe("sitemap", () => {
  test("does not duplicate locale entries and keeps alternates", async () => {
    const [slug, locales] = Object.entries(articleLocales)[0];
    expect(slug).toBeDefined();

    const originalBaseUrl = process.env.BASE_URL;
    process.env.BASE_URL = "https://springfall.cc";
    vi.resetModules();

    try {
      const { default: sitemap } = await import("./sitemap");
      const urls = sitemap();

      const expectedLanguages = Object.fromEntries(
        locales.map((locale) => [
          locale,
          `https://springfall.cc/${locale}/${slug}`,
        ]),
      );
      const primaryLocale = locales.includes(i18n.defaultLocale)
        ? i18n.defaultLocale
        : locales[0];
      const entries = urls.filter(
        (entry) => entry.url === expectedLanguages[primaryLocale],
      );

      expect(entries).toHaveLength(1);
      expect(entries[0].alternates?.languages).toEqual(expectedLanguages);
    } finally {
      process.env.BASE_URL = originalBaseUrl;
      vi.resetModules();
    }
  });
});
