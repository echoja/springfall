import type { ArticleItem } from "@modules/article/types";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "방송통신대학교 후기 + 간단 설명 + 꿀팁";
export const url = "https://springfall.cc/article/2023-02/knou-tips";
export const summary =
  "방송통신대학교 2학년 재학생이 알려주는 간단한 후기와 설명. 필자만의 꿀팁도 조금 소개합니다.";
export const createdAt = dayjs("2023-02-19").toISOString();
export const updatedAt = dayjs("2023-02-19").toISOString();
export const image = i1;
export const imageAlt = "방송통신대학교 전경";

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
