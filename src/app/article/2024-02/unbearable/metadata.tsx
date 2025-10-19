import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "≪참을 수 없는 존재의 가벼움≫을 다시금 읽고...";
const slug = "article/2024-02/unbearable";
export const summary = "모조리 추상화해버리는 세상에 맞서기";
export const createdAt = dayjs("2024-02-25").toISOString();
export const updatedAt = dayjs("2024-02-25").toISOString();
export const image = i1;
export const imageAlt = "일요일 오전에 아아 한잔과 함께 읽는 책";
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
