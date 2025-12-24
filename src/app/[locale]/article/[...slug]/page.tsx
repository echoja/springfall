import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleJsonLd } from "next-seo";
import ArticleHeader from "@modules/article/ArticleHeader";
import getArticleHeaderProps from "@modules/metadata/getArticleHeaderProps";
import getArticleJsonLdProps from "@modules/metadata/getArticleJsonLdProps";
import getArticleMetadata from "@modules/metadata/getArticleMetadata";
import {
  contentEntries,
  getContentEntry,
  getContentItem,
  getContentMdx,
} from "content";
import { isLocale } from "@modules/i18n/util";

interface IPageParams {
  locale: string;
  slug: string[];
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<IPageParams[]> {
  return contentEntries.flatMap((entry) => {
    const slugParts = entry.slug.replace(/^article\//, "").split("/");
    return entry.locales.map((locale) => ({
      locale,
      slug: slugParts,
    }));
  });
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<IPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  if (!isLocale(params.locale)) {
    return {};
  }

  const slugBase = `article/${params.slug.join("/")}`;
  const entry = getContentEntry(slugBase);
  if (!entry || !entry.locales.includes(params.locale)) {
    return {};
  }

  const item = getContentItem(entry, params.locale);
  return getArticleMetadata(item);
}

export default async function ArticlePage({
  params: paramsPromise,
}: {
  params: Promise<IPageParams>;
}) {
  const params = await paramsPromise;
  if (!isLocale(params.locale)) {
    notFound();
  }

  const slugBase = `article/${params.slug.join("/")}`;
  const entry = getContentEntry(slugBase);
  if (!entry || !entry.locales.includes(params.locale)) {
    notFound();
  }

  const item = getContentItem(entry, params.locale);
  const { default: Content } = await getContentMdx(entry, params.locale);

  return (
    <>
      <ArticleJsonLd {...getArticleJsonLdProps(item)} />
      <ArticleHeader {...getArticleHeaderProps(item)} />
      <Content />
    </>
  );
}
