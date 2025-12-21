import { describe, expect, test, vi } from "vitest";

describe("sitemap", () => {
  test("does not duplicate locale entries and keeps alternates", async () => {
    const originalBaseUrl = process.env.BASE_URL;
    process.env.BASE_URL = "https://springfall.cc";
    vi.resetModules();

    try {
      const { default: sitemap } = await import("./sitemap");
      const urls = sitemap();

      const entries = urls.filter((entry) =>
        entry.url.includes("/article/2025-08/effective-burn-out-tips"),
      );

      expect(entries).toHaveLength(1);
      expect(entries[0].alternates?.languages).toEqual({
        ko: "https://springfall.cc/ko/article/2025-08/effective-burn-out-tips",
        en: "https://springfall.cc/en/article/2025-08/effective-burn-out-tips",
      });
    } finally {
      process.env.BASE_URL = originalBaseUrl;
      vi.resetModules();
    }
  });
});
