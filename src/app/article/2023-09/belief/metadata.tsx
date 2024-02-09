import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "믿음 (feat. 물고기는 존재하지 않는다)";
export const url = "https://springfall.cc/article/2023-09/belief";
export const summary =
  "여러 생각할 만한 거리를 던져주는 ≪물고기는 존재하지 않는다≫라는 책은 좋습니다. 앞으로 무엇을 믿을 것인가? 주저리주저리 했습니다.";
export const createdAt = dayjs("2023-09-11").toISOString();
export const updatedAt = dayjs("2023-09-11").toISOString();
export const image = i1;
export const imageAlt = "물고기는 존재하지 않는다 표지";
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
