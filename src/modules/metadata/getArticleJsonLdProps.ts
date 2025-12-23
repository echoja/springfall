import type { ArticleItem } from "@modules/article/types";

import type { ArticleJsonLdProps } from "next-seo";
import { authorName, authorUrl } from "./constants";

export default function getArticleJsonLdProps(
  item: ArticleItem,
): ArticleJsonLdProps {
  const { createdAt, image, summary, title, updatedAt, slug: url } = item;

  return {
    type: "BlogPosting",
    url,
    headline: title,
    image: [image.src],
    author: [
      {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
        email: "eszqsc112@gmail.com",
      },
    ],
    publisher: authorName,
    datePublished: createdAt,
    dateModified: updatedAt,
    description: summary,
    isAccessibleForFree: true,
  };
}
