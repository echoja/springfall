import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "../../../../article/2025-08/effective-burn-out-tips/e.jpg";

export const title = "[Short Review] Effective Burnout Tips";
export const slug = "en/article/2025-08/effective-burn-out-tips";
export const summary = "Hm... a bit underwhelming.";

export const createdAt = dayjs("2025-08-30").toISOString();
export const updatedAt = dayjs("2025-08-30").toISOString();
export const image = i1;
export const imageAlt = "Book cover: Effective Burnout Tips";
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
  locale: "en",
};
