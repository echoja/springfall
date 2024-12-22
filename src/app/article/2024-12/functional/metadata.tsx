import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./mm.jpeg";

export const title =
  "[TypeScript] 함수형 로직 짜기의 필요성, 실제 적용, 그리고 한계";
export const url = "https://springfall.cc/article/2024-12/functional";
export const summary =
  "타입스크립트에서 비즈니스 로직을 함수형으로 구성하는 방법에 대해 알아보고 응용까지 해봅니다. 그리고 이 방법이 정답인가에 대한 생각도 해봅니다.";
export const createdAt = dayjs("2024-12-22").toISOString();
export const updatedAt = dayjs("2024-12-22").toISOString();
export const image = i1;
export const imageAlt = "함수형 프로그래밍";
export const category: Category = "기술";

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
