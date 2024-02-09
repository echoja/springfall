import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title =
  "[WIP] itty-router로 간단한 Node.js 서버 띄우기 (feat. Logtail)";
export const url = "https://springfall.cc/article/2024-02/itty-router";
export const summary = "...";
export const createdAt = dayjs("2024-02-10").toISOString();
export const updatedAt = dayjs("2024-02-10").toISOString();
export const image = i1;
export const imageAlt = "시간";
export const category: Category = "기술";

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
