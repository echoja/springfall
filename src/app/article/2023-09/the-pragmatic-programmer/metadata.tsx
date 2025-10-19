import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import prag from "./prag.jpg";

export const title = "[리뷰] 실용주의 프로그래머";
export const slug = "article/2023-09/the-pragmatic-programmer";
export const summary =
  "개발자들에게 가장 필요한 책! 나에게도 가장 필요했던 책.";
export const createdAt = dayjs("2023-09-05").toISOString();
export const updatedAt = dayjs("2023-09-05").toISOString();
export const image = prag;
export const imageAlt = "실용주의 프로그래머 표지";
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
