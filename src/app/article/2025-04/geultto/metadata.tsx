import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import big2 from "./big2.png";

export const title = "개발자 글쓰기 모임 '글또' 10기 참여 후기";
const slug = "article/2025-04/geultto";
export const summary =
  "이 세상에서 가장 따뜻한 개발자 글쓰기 모임, '글쓰는 또라이가 세상을 바꾼다'. 얻은 경험과 배운 점들을 공유합니다.";
export const createdAt = dayjs("2025-04-18").toISOString();
export const updatedAt = dayjs("2025-04-18").toISOString();
export const image = big2;
export const imageAlt = "글또 후기";
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
