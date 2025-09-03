import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import pyo from "./pyo.jpg";
export const title = "개발자 MacBook 종합 세팅 - 2025년 버전";
const slug = "article/2025-01/mac-settings";
export const summary =
  "2025년 맥북을 새로 받은 기념 내게 정말 필요한 것만 열심히 세팅해봅시다.";
export const createdAt = dayjs("2025-01-10").toISOString();
export const updatedAt = dayjs("2025-01-10").toISOString();
export const image = pyo;
export const imageAlt = "애플인 척 하는 노트북 하는 개발자";
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
