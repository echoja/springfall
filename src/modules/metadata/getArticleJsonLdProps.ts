import type { ArticleItem } from "@modules/article/types";

import type { ArticleJsonLdProps } from "next-seo";
import { authorList, authorName } from "./constants";

export default function getArticleJsonLdProps(
  item: ArticleItem,
): ArticleJsonLdProps {
  const { createdAt, image, summary, title, updatedAt, url } = item;

  return {
    useAppDir: true,
    url,
    title,
    images: [image.src],
    authorName: authorList,
    datePublished: createdAt,
    dateModified: updatedAt,
    publisherName: authorName,
    description: summary,
    type: "BlogPosting",
    isAccessibleForFree: true,
  };
}
