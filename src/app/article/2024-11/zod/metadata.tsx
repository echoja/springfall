import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./u.jpg";

export const title =
  "타입스크립트 국룰 Validation 라이브러리 Zod에 대해 알아보자";
const slug = "article/2024-11/zod";
export const summary =
  "TypeScript에서 자주 사용되는 검증 라이브러리인 Zod가 인기를 얻게 된 배경을 알아보고, 간단한 사용법도 알아봅니다.";
export const createdAt = dayjs("2024-11-10").toISOString();
export const updatedAt = dayjs("2024-11-10").toISOString();
export const image = i1;
export const imageAlt = "서류 검증하는 사람";
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
