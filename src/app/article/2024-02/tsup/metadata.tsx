import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title =
  "[WIP] tsup으로 간단하게 타입스크립트 기반 Node.js 서버 띄우기 (feat. itty-router, logtail)";
const slug = "article/2024-02/tsup";
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
  slug,
  category,
  tags: [],
};
