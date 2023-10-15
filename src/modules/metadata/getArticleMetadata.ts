import type { ArticleItem } from "@modules/article/types";

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
    url,
  } = item;

  return {
    title,
    category,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url,
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
    alternates: {
      canonical: url,
    },
  };
}
