import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./1.jpg";

export const title = "사내 IT 프로젝트 공모전 후기";
const slug = "article/2023-06/company-contest";
export const summary =
  "자리배정시스템 3주 만에 만들어보기. 기술과 전략과 느낀 점들. 힘들었지만 보람찼다. 모두들 고생하셨습니다.";
export const createdAt = dayjs("2023-06-04").toISOString();
export const updatedAt = dayjs("2023-06-04").toISOString();
export const image = i1;
export const imageAlt = "멋진 사무실 모습";
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
