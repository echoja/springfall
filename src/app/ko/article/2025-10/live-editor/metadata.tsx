import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "./i1.jpg";

export const title = "고객 사이트에서 효율적으로 동작하는 Front 앱 만들기";
export const slug = "ko/article/2025-10/live-editor";
export const summary =
  "배너 삽입 시스템을 만들고 동작시키고 개발하면서 이렇게 특수한 환경에서의 프론트엔드 개발에 대해 알아봅니다.";

export const createdAt = dayjs("2025-10-20").toISOString();
export const updatedAt = dayjs("2025-10-20").toISOString();
export const image = i1;
export const imageAlt = "포스트잇 사진.";
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
  locale: "ko",
};
