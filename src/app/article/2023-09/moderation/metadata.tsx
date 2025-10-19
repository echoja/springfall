import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "적당히 하는 것을 끊임없이 추구하기";
const slug = "article/2023-09/moderation";
export const summary =
  "어떻게 하면 적당히 할 수 있을까요? 그 고민의 끝은 어디일까요?";
export const createdAt = dayjs("2023-09-04").toISOString();
export const updatedAt = dayjs("2023-09-04").toISOString();
export const image = i1;
export const imageAlt = "선택의 갈림길";

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
