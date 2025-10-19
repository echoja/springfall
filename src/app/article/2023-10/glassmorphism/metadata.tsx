import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.png";

export const title =
  "글래스모피즘 디자인이란 무엇일까? (작성중) (feat. code generator)";
const slug = "article/2023-10/glassmorphism";
export const summary =
  "2023년 디자인 트렌드 중 하나인 Glassmorphism에 대해 자세히 알아보지는 않고 그냥 코드 생성기를 시험삼아 작성해보는 글입니다.";
export const createdAt = dayjs("2023-10-15").toISOString();
export const updatedAt = dayjs("2023-10-15").toISOString();
export const image = i1;
export const imageAlt = "패턴";
export const category: Category = "디자인";

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
