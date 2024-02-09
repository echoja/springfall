import type { IArticleHeaderProps } from "@modules/article/ArticleHeader";
import type { ArticleItem } from "@modules/article/types";

export default function getArticleHeaderProps(
  item: ArticleItem,
): IArticleHeaderProps {
  const { summary, title, updatedAt } = item;

  return {
    title,
    updatedAt,
    desc: summary,
  };
}
