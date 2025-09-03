import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "../../../../article/2025-08/effective-burn-out-tips/e.jpg";

export const title = "[책 짧은리뷰] 효과 빠른 번아웃 처방전";
export const slug = "ko/article/2025-08/effective-burn-out-tips";
export const summary = "쬼... 아쉽네예";

export const createdAt = dayjs("2025-08-30").toISOString();
export const updatedAt = dayjs("2025-08-30").toISOString();
export const image = i1;
export const imageAlt = "효과 빠른 번아웃 처방전 책 표지";
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
