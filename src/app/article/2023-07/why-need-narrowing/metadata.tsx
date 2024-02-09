import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "타입스크립트에서 Narrowing (타입 좁히기)가 필요한 이유";
export const url = "https://springfall.cc/article/2023-07/why-need-narrowing";
export const summary =
  "타입스크립트 세계에서 타입을 다루는 방법 중 하나인 Narrowing 에 대해 고찰해봅니다.";
export const createdAt = dayjs("2023-07-23").toISOString();
export const updatedAt = dayjs("2023-07-23").toISOString();
export const image = i1;
export const imageAlt = "좁은 골목";
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
