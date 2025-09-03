import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "[리뷰] 알베르 카뮈의 반항하는 인간";
export const slug = "article/2023-07/human-life";
export const summary =
  "느낀 점을 적어봅니다. 이번 글은 특히 두서가 없습니다. 이해해주세요.";
export const createdAt = dayjs("2023-07-17").toISOString();
export const updatedAt = dayjs("2023-07-23").toISOString();
export const image = i1;
export const imageAlt = "반항하는 인간 표지";
export const category: Category = "리뷰";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  slug,
  category,
  tags: [],
};
