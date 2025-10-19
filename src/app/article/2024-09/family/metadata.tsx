import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i1 from "./ii.jpg";

export const title = "나와 가족";
const slug = "article/2024-09/family";
export const summary = "가족이라는 렌즈로 나를 들여다보기";
export const createdAt = dayjs("2024-09-17").toISOString();
export const updatedAt = dayjs("2024-09-17").toISOString();
export const image = i1;
export const imageAlt = "어느 가족사진";
// export const category: Category = "기타";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  slug,
  // category,
  tags: [],
};
