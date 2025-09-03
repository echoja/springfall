import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import prag from "./o.jpg";

export const title =
  "GraphQL codegen으로 타입스크립트 환경에서 효율적으로 개발해보자";
const slug = "article/2023-09/graphql-codegen";
export const summary =
  "GraphQL과 TypeScript를 이어주는 길을 직접 만들어줄 필요는 없습니다. codegen으로 꿈을 이룰 수 있습니다! 마냥 현실이 좋다고는 할 순 없지만 조금이라도 개선하는 게 의미가 있죠, 안그래요?";
export const createdAt = dayjs("2023-09-24").toISOString();
export const updatedAt = dayjs("2023-09-24").toISOString();
export const image = prag;
export const imageAlt = "두렁에 빠진 차를 밀고 있는 사람들";
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
