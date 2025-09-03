import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./1.jpg";

export const title = "2025년으로 넘어가는 문턱에서, 일터의 소로.";
const slug = "article/2025-01/thoreau";
export const summary =
  "2024년 짧은 회고, 일터의 소로가 주는 메시지, 바람직한 삶의 태도, 2025년 짧은 목표.";
export const createdAt = dayjs("2025-01-01").toISOString();
export const updatedAt = dayjs("2025-01-01").toISOString();
export const image = i1;
export const imageAlt = "일터의 소로 표지";
export const category: Category = "회고";

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
