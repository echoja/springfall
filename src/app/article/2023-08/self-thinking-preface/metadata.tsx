import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "어떤 개발자가 되어야 할까? - 서문";
export const url =
  "https://springfall.cc/article/2023-08/self-thinking-preface";
export const summary = "자아탐구 타임… 의 서문";
export const createdAt = dayjs("2023-08-07").toISOString();
export const updatedAt = dayjs("2023-08-07").toISOString();
export const image = i1;
export const imageAlt = "선택의 갈림길";

export const item: ArticleItem = {
  createdAt,
  updatedAt,
  image,
  imageAlt,
  summary,
  title,
  url,
  tags: [],
};
