import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "중요한 건 꺾였지만 그냥 하는 마음";
const slug = "article/2023-06/why-writing";
export const summary =
  "제가 블로그에 글을 쓰고자 하는 이유, 글을 쓸 때 어떻게 쓰는지에 대해 그냥 써봤습니다.";
export const createdAt = dayjs("2023-06-17").toISOString();
export const updatedAt = dayjs("2023-06-17").toISOString();
export const image = i1;
export const imageAlt = "종이 위에서 무언가를 쓰고 있는 펜의 모습";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  slug,

  tags: [],
};
