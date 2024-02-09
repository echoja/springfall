import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "[리뷰] 에브리띵 에브리웨어 올 앳 원스";
export const url = "https://springfall.cc/article/2022-11/everything";
export const summary =
  "허무주의와 무한다정주의라는 이데올로기의 대립이, 딸과 엄마의 대립이라는, 지극히 가족적인 이야기로 풀어질 수 있다는 게, 지금 생각해보면 참 대단한 부분이지 않나 싶습니다.";
export const createdAt = dayjs("2022-11-01").toISOString();
export const updatedAt = dayjs("2022-11-01").toISOString();
export const image = i1;
export const imageAlt = "에브리띵 에브리웨어 올 앳 원스 포스터";
export const category: Category = "리뷰";

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
