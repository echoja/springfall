import type { Locale } from "@/modules/i18n/types";
import { contentEntries } from "content/manifest.generated";

// Explicit manifest of per-article locale availability.
// Key: slug without leading slash, e.g., "article/2025-08/effective-burn-out-tips"
const contentLocales: Record<
  string,
  ReadonlyArray<Locale>
> = Object.fromEntries(
  contentEntries.map((entry) => [entry.slug, entry.locales]),
);

export const articleLocales: Record<string, ReadonlyArray<Locale>> = {
  ...contentLocales,
  "article/2025-08/effective-burn-out-tips": ["ko", "en"],
};

export function getLocalesForSlug(slug: string): ReadonlyArray<Locale> {
  return articleLocales[slug] ?? [];
}
