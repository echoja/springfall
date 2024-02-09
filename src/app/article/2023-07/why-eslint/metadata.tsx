import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.png";

export const title = "ESLint 가 필요한 이유 (작성중)";
export const url = "https://springfall.cc/article/2023-07/why-eslint";
export const summary =
  "Node.js 프로젝트에서 많이 사용되는 Lint 도구인 ESLint 가 필요한 이유에 대해 알아봅니다.";
export const createdAt = dayjs("2023-07-30").toISOString();
export const updatedAt = dayjs("2023-07-30").toISOString();
export const image = i1;
export const imageAlt = "npx create-next-app@latest 실행화면";
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
