import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "조건 검사하는 데이터 구조 만들기 (TypeScript)";
export const url = "https://springfall.cc/article/2024-10/check-target";
export const summary =
  "Node.js + TypeScript 환경에서 조건 검사를 데이터화하는 방법을 다룹니다. 조건 데이터와 현재의 상황을 검사 함수에 집어넣으면 참/거짓이 나오도록 하는 과정입니다. 마지막에는 만든 함수가 잘 동작하는지 Vitest로 테스트까지 해봅니다.";
export const createdAt = dayjs("2024-10-27").toISOString();
export const updatedAt = dayjs("2024-10-27").toISOString();
export const image = i1;
export const imageAlt = "타게팅을 하는 소년";
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
