import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "[도서 리뷰] 나는 나, 엄마는 엄마";
const slug = "article/2022-11/i-me-mom-mom";
export const summary =
  "엄마와 딸의 관계를 바꾸는 (이라는 홍보문구지만, 바꾸라는 말을 쉽게 하지 않는) 사회심리학";
export const createdAt = dayjs("2022-11-05").toISOString();
export const updatedAt = dayjs("2022-11-05").toISOString();
export const image = i1;
export const imageAlt = "나는 나, 엄마는 엄마 도서 앞모습";
export const category: Category = "리뷰";

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
