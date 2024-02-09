import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title =
  "[WIP] prisma로 DB를 관리하고 테스트까지 자동화해보기 (feat. vitest)";
export const url = "https://springfall.cc/article/2024-02/prisma";
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
