import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title = "[WIP] async-mutex로 요청에 대한 동시성 제어하기";
export const url = "https://springfall.cc/article/2024-02/async-mutex";
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
