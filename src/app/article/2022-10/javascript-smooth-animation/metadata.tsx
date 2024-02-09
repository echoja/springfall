import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i2 from "./i2.jpeg";

export const title =
  "[Javascript] 스크롤에 따라 부드러운 애니메이션 구현하기 (Feat. iPhone SE)";
export const url =
  "https://springfall.cc/article/2022-10/javascript-smooth-animation";
export const summary =
  "특별한 라이브러리를 사용하지 않고, javascript를 이용하여 애플 감성 느낌의 스크롤 애니메이션 효과를 구현합니다.";
export const createdAt = dayjs("2022-10-03").toISOString();
export const updatedAt = dayjs("2022-10-03").toISOString();
export const image = i2;
export const imageAlt = "4가지 구성요소";
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
