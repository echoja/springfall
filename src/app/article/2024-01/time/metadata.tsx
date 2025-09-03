import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title = "시간. 장송의 프리렌. 어바웃 타임.";
const slug = "article/2024-01/time";
export const summary =
  "전혀 다른 듯 보이는 두 작품의 공통점을 찾아보며 시간과 인생에 대해 생각해보자";
export const createdAt = dayjs("2024-01-21").toISOString();
export const updatedAt = dayjs("2024-01-21").toISOString();
export const image = i1;
export const imageAlt = "시간";
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
