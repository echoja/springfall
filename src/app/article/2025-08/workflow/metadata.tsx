import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./w.jpg";

export const title =
  "[TypeScript] 복구(롤백) 로직이 있는 경량 워크플로우 시스템 적용하기";
export const url = "https://springfall.cc/article/2025-08/workflow";
export const summary =
  "일련의 작업들이 모두 다 잘 진행되어야 비로소 성공하는, 하지만 각 단계에서 실패를 적절히 처리해야 하는 워크플로우 시스템을 간단히 만들어봅시다";

export const createdAt = dayjs("2025-08-18").toISOString();
export const updatedAt = dayjs("2025-08-18").toISOString();
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
  url,
  category,
  tags: [],
};
