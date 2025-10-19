import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./bird.jpg";

export const title =
  "Vanilla 자바스크립트에서 개별적인 상태 관리하기 (@preact/signals-core)";
const slug = "article/2024-11/signal";
export const summary =
  "상태 관리에 대해서 다시금 분해하여 생각해봅니다. 프론트엔드 프레임워크를 적극적으로 활용하지 못하는 상황에서 @preact/signals-core를 사용하여 상태 관리를 해봅니다.";
export const createdAt = dayjs("2024-11-24").toISOString();
export const updatedAt = dayjs("2024-11-24").toISOString();
export const image = i1;
export const imageAlt = "작고 귀여운 새";
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
