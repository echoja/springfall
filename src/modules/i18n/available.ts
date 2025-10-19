import type { Locale } from "@common/config";

// Explicit manifest of per-article locale availability.
// Key: slug without leading slash, e.g., "article/2025-08/effective-burn-out-tips"
export const articleLocales: Record<string, ReadonlyArray<Locale>> = {
  "article/2025-08/effective-burn-out-tips": ["ko", "en"],
};

export function getLocalesForSlug(slug: string): ReadonlyArray<Locale> {
  return articleLocales[slug] ?? [];
}
