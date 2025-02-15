import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import og from "./og.png";

export const title = "[React] 텍스트 콘텐츠 더보기/접기 UI 깔끔하게 구현하기";
export const url =
  "https://springfall.cc/article/2025-02/react-expandable-text";
export const summary =
  "콘텐츠 요소가 이리저리 많을 때 흔히 사용하는 더보기/접기 UI를 React로 깔끔하게 구현해봅니다.";
export const createdAt = dayjs("2025-02-15").toISOString();
export const updatedAt = dayjs("2025-02-15").toISOString();
export const image = og;
export const imageAlt = "React Show More / Less The Clean Implementation";
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
