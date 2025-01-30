import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import gtm4 from "./gtm4.png";

export const title = "[GTM] 클릭 이벤트를 GA로 보내는 깔끔한 방법";
export const url = "https://springfall.cc/article/2025-01/ga";
export const summary =
  "GTM과 GA는 웹서비스를 운영할 때 사용자들의 행동을 추적하고 분석하는데 유용한 툴입니다. 하지만 그만큼 잘 쓰기가 어렵습니다. 최소한의 설정으로 최대한의 효과를 낼 수 있는 방법을 소개합니다.";
export const createdAt = dayjs("2025-01-31").toISOString();
export const updatedAt = dayjs("2025-01-31").toISOString();
export const image = gtm4;
export const imageAlt = "GTM에 GA 태그가 세팅되어 있는 화면";
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
