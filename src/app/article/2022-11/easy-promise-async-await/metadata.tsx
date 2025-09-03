import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i3 from "./i3.jpeg";

export const title =
  "[Javascript] 비동기, Promise, async, await 확실하게 이해하기";
export const slug = "article/2022-11/easy-promise-async-await";
export const summary =
  "초보자 입장에서 헷갈리기 쉬운 자바스크립트의 Promise 에 대해 낱낱이 파헤칩니다. 더 나아가 async와 await을 올바르게 사용하는 법까지 소개합니다.";
export const createdAt = dayjs("2022-11-02").toISOString();
export const updatedAt = dayjs("2022-11-02").toISOString();
export const image = i3;
export const imageAlt = "비동기 작업은 고기잡이 배를 떠나보내는 것과 비슷하다";
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
