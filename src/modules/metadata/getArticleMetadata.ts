import type { ArticleItem } from "@modules/article/types";
import { articleLocales } from "@modules/i18n/available";

import type { Metadata } from "next";

export default function getArticleMetadata(item: ArticleItem): Metadata {
  const {
    category,
    createdAt,
    image,
    imageAlt,
    summary,
    title,
    updatedAt,
    slug,
  } = item;

  return {
    title,
    category,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: new URL(slug, process.env.BASE_URL).toString(),
      type: "article",
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      images: [
        {
          url: image.src,
          width: image.width,
          height: image.height,
          alt: imageAlt,
        },
      ],
    },
    alternates: (() => {
      const url = new URL(slug, process.env.BASE_URL).toString();
      try {
        const locales = articleLocales[slug];
        const languages = locales
          ? Object.fromEntries(locales.map((l) => [l, `/${l}/${slug}`]))
          : undefined;
        return { canonical: url, languages };
      } catch {
        return { canonical: url };
      }
    })(),
  };
}
