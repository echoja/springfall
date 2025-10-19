import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./eslint.png";

export const title =
  "ESLint Rule: 특정 className 사용 금지하기 (바이브 코딩을 위해)";
export const slug = "article/2025-07/eslint-forbid-classname";
export const summary =
  "TailwindCSS 프로젝트에서 일관된 디자인 토큰 사용을 위해 특정 className 사용을 금지하는 ESLint 규칙을 설정하는 방법에 대해 알아봅니다. 이 규칙은 LLM에게 도움이 될 수도 있습니다!";
export const createdAt = dayjs("2025-07-03").toISOString();
export const updatedAt = dayjs("2025-07-03").toISOString();
export const image = i1;
export const imageAlt = "ESlint Forbid ClassName";
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
