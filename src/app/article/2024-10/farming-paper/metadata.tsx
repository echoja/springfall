import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./farm.png";

export const title = "필요한 물건을 직접 만들어 갖다 쓰기";
const slug = "article/2024-10/farming-paper";
export const summary =
  "방송통신대를 무사히 조기졸업하게 해준 내쓸내만 서비스, Farming Paper에 대한 이야기입니다.";
export const createdAt = dayjs("2024-10-05").toISOString();
export const updatedAt = dayjs("2024-10-05").toISOString();
export const image = i1;
export const imageAlt = "Farming Paper 간략 설명";
export const category: Category = "회고";

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
