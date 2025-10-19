import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./b.jpg";

export const title = "<개드립 분석하는 만화>를 회고하며";
const slug = "article/2023-10/dogdrip";
export const summary =
  "오로지 재미만을 위한 낭만의 프로젝트. 그때의 기분과 에너지를 다시금 되새겨보는 시간을 가져봅니다.";
export const createdAt = dayjs("2023-10-07").toISOString();
export const updatedAt = dayjs("2023-10-07").toISOString();
export const image = i1;
export const imageAlt = "패턴";
export const category: Category = "회고";

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
