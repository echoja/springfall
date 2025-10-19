import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title = "Flutter + Node.js(Typescript)로 포스기 앱 만들기";
const slug = "article/2024-02/hof";
export const summary =
  "일일호프에서 사용된 포스기 앱을 만들어갔던 과정과 기술 스택을 가볍게 다룹니다. 기획적인 설계와 성과에 대해 회고합니다.";
export const createdAt = dayjs("2024-02-12").toISOString();
export const updatedAt = dayjs("2024-02-12").toISOString();
export const image = i1;
export const imageAlt = "시간";
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
