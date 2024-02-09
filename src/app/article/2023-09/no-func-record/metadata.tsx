import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./record.jpg";

export const title = "[TypeScript] 함수 Record 는 지옥이다";
export const url = "https://springfall.cc/article/2023-09/no-func-record";
export const summary =
  "Object, Map, Record 형태에 함수를 몰아넣고 사용할 때 어려움이 있습니다. 이를 타입 좁히기가 가능한 형태로 바꿔 사용합시다.";
export const createdAt = dayjs("2023-09-07").toISOString();
export const updatedAt = dayjs("2023-09-07").toISOString();
export const image = i1;
export const imageAlt = "레코드샵";
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
