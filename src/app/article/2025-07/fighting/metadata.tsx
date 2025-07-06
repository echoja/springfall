import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./boxing.jpg";

export const title = "회사에 싸움 걸기 다짐 중";
export const url = "https://springfall.cc/article/2025-07/fighting";
export const summary =
  "사업을 더 번창시키기 위해서 내가 할 수 있는 일은 무엇일까요";
export const createdAt = dayjs("2025-07-06").toISOString();
export const updatedAt = dayjs("2025-07-06").toISOString();
export const image = i1;
export const imageAlt = "복싱";
export const category: Category = "일상";

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
