import type { ArticleItem } from "@modules/article/types";

import type { ArticleJsonLdProps } from "next-seo";
import { authorList, authorName } from "./constants";

export default function getArticleJsonLdProps(
  item: ArticleItem,
): ArticleJsonLdProps {
  const { createdAt, image, summary, title, updatedAt, slug: url } = item;

  return {
    type: "BlogPosting",
    url,
    headline: title,
    image: [image.src],
    author: authorList,
    publisher: authorName,
    datePublished: createdAt,
    dateModified: updatedAt,
    description: summary,
    isAccessibleForFree: true,
  };
}
