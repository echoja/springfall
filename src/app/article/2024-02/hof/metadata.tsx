import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title =
  "Flutter + Node.js(Typescript)로 포스기 앱 만들기 (작성중)";
export const url = "https://springfall.cc/article/2024-02/hof";
export const summary = "...";
export const createdAt = dayjs("2024-02-10").toISOString();
export const updatedAt = dayjs("2024-02-10").toISOString();
export const image = i1;
export const imageAlt = "시간";
export const category: Category = "회고";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  url,
  category,
  tags: [],
};
