import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "프론트 개발자의 GoLang 적응기 1화";
export const url =
  "https://springfall.cc/article/2023-08/adopting-golang-as-a-front-end-developer-1";
export const summary = "";
export const createdAt = dayjs("2023-08-28").toISOString();
export const updatedAt = dayjs("2023-08-28").toISOString();
export const image = i1;
export const imageAlt = "선택의 갈림길";
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
