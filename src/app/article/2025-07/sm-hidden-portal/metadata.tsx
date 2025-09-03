import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./inject.png";

export const title = "`sm:hidden` 자식으로 있는 툴팁(Portal)도 숨기기";
const slug = "article/2025-07/sm-hidden-portal";
export const summary =
  "Portal(툴팁 등)로 분리된 자식 컴포넌트가 부모의 숨김 상태(TailwindCSS sm:hidden)를 제대로 반영하지 못하는 문제를 트리키하게 해결하는 법을 알아봅니다.";

export const createdAt = dayjs("2025-07-21").toISOString();
export const updatedAt = dayjs("2025-07-21").toISOString();
export const image = i1;
export const imageAlt = "TODO:이미지수정";
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
