import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpeg";

export const title = "[리뷰] 슬픔이여 안녕";
export const url = "https://springfall.cc/article/2022-10/hello-sadness";
export const summary =
  "세상엔 다양한 세계가 있고, 화해할 수도 있지만 양립하지 못할 수도 있다. 그런 사실에 직면하는 것이 슬픔인 것 같다.";
export const createdAt = dayjs("2022-10-02").toISOString();
export const updatedAt = dayjs("2022-10-02").toISOString();
export const image = i1;
export const imageAlt = "슬픔이여 안녕 표지";
export const category: Category = "리뷰";

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
