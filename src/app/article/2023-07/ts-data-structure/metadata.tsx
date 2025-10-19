import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "타입스트립트 데이터 핸들링 마스터하기 (작성중)";
const slug = "article/2023-07/ts-data-structure";
export const summary = "";
export const createdAt = dayjs("2023-07-16").toISOString();
export const updatedAt = dayjs("2023-07-23").toISOString();
export const image = i1;
export const imageAlt = "종이 위에서 무언가를 쓰고 있는 펜의 모습";
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
