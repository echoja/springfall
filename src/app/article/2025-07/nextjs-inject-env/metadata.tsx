import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./inject.png";

export const title =
  "[Next.js] 브라우저(Client)로 환경변수 주입하기 (Pages와 App Router 모두 지원)";
const slug = "article/2025-07/nextjs-inject-env";
export const summary =
  "더이상의 NEXT_PUBLIC_XXX 환경변수는 없다! Next.js에서 브라우저로 손쉽게 환경변수를 주입하여 빌드를 복잡하게 해야 하는 상황을 해결합니다.";
export const createdAt = dayjs("2025-07-19").toISOString();
export const updatedAt = dayjs("2025-07-19").toISOString();
export const image = i1;
export const imageAlt = "Next.js 환경변수 주입";
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
