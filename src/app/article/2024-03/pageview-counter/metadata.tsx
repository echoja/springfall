import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./time.avif";

export const title =
  "[WIP] Cloudflare KV를 이용하여 페이지뷰 SVG 이미지 구현하기";
const slug = "article/2024-03/pageview-counter";
export const summary =
  "기술 찍먹 기록입니다. SVG 때문에 배보다 배꼽이 더 커버릴 뻔 했습니다.";
export const createdAt = dayjs("2024-03-03").toISOString();
export const updatedAt = dayjs("2024-03-03").toISOString();
export const image = i1;
export const imageAlt = "시간";
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
