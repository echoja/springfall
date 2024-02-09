import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i.png";

export const title = "Node.js 스트림(stream) 개념을 익혀보자";
export const url = "https://springfall.cc/article/2021-12/node-js-stream";
export const summary =
  "Stream 자료구조를 간단하게 익히고 Readable 클래스를 직접 확장하여 구현해봅니다";
export const createdAt = dayjs("2021-12-07").toISOString();
export const updatedAt = dayjs("2021-12-07").toISOString();
export const image = i1;
export const imageAlt = "스트림 그림 설명";
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
