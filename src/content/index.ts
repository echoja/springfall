import type { ComponentType } from "react";
import dayjs from "dayjs";
import { i18n, type Locale } from "@/modules/i18n/types";
import type { ArticleItem } from "@modules/article/types";
import {
  contentBySlug,
  contentEntries,
  type ContentEntry,
} from "./manifest.generated";

export { contentEntries };

export function getContentEntry(slug: string): ContentEntry | undefined {
  return contentBySlug[slug];
}

export function getContentItem(
  entry: ContentEntry,
  locale: Locale,
): ArticleItem {
  const resolvedLocale = entry.locales.includes(locale)
    ? locale
    : i18n.defaultLocale;
  const title = entry.title[resolvedLocale] ?? entry.title[i18n.defaultLocale];
  const summary =
    entry.summary[resolvedLocale] ?? entry.summary[i18n.defaultLocale];
  const imageAlt =
    entry.imageAlt[resolvedLocale] ?? entry.imageAlt[i18n.defaultLocale];

  return {
    createdAt: dayjs(entry.createdAt).toISOString(),
    updatedAt: dayjs(entry.updatedAt).toISOString(),
    image: entry.image,
    imageAlt,
    summary,
    title,
    slug: `${resolvedLocale}/${entry.slug}`,
    category: entry.category,
    tags: entry.tags,
    locale: resolvedLocale,
  };
}

export function getContentListItem(entry: ContentEntry): ArticleItem {
  const locale = i18n.defaultLocale;
  const title = entry.title[locale] ?? entry.title[i18n.defaultLocale];
  const summary = entry.summary[locale] ?? entry.summary[i18n.defaultLocale];
  const imageAlt = entry.imageAlt[locale] ?? entry.imageAlt[i18n.defaultLocale];

  return {
    createdAt: dayjs(entry.createdAt).toISOString(),
    updatedAt: dayjs(entry.updatedAt).toISOString(),
    image: entry.image,
    imageAlt,
    summary,
    title,
    slug: entry.slug,
    category: entry.category,
    tags: entry.tags,
  };
}

export async function getContentMdx(
  entry: ContentEntry,
  locale: Locale,
): Promise<{ default: ComponentType }> {
  const resolvedLocale = entry.locales.includes(locale)
    ? locale
    : i18n.defaultLocale;
  return entry.mdx[resolvedLocale]();
}

export const contentListItems: ArticleItem[] =
  contentEntries.map(getContentListItem);
