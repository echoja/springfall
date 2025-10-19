import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i5 from "./i5.png";

export const title = "draw.io(diagrams.net) 자동 배치로 효율화하기";
const slug = "article/2023-03/draw-io-auto-layout";
export const summary =
  "검증된 다이어그램 그리기 도구인 draw.io 에서 문서가 복잡해질 때 아주 유용하게 사용할 수 있는 레이아웃 배치 기능을 사용해봅니다.";
export const createdAt = dayjs("2023-03-11").toISOString();
export const updatedAt = dayjs("2023-03-11").toISOString();
export const image = i5;
export const imageAlt = "레이아웃 배치 기능이 적용된 다이어그램";
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
