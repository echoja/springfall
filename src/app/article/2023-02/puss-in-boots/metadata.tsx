import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import puss0 from "./puss0.jpg";

export const title = "[영화 리뷰] 장화신은 고양이: 끝내주는 모험 (스포)";
const slug = "article/2023-02/puss-in-boots";
export const summary = "장화신은 고양이는 용감해졌다.";
export const createdAt = dayjs("2023-02-12").toISOString();
export const updatedAt = dayjs("2023-02-12").toISOString();
export const image = puss0;
export const imageAlt = "장화신은 고양이: 끝내주는 모험 포스터";
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
