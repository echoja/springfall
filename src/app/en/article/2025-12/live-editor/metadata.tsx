import type { ArticleItem } from "@modules/article/types";
import type { Category } from "@modules/category";
import dayjs from "dayjs";
import i1 from "../../../../ko/article/2025-12/live-editor/i1.jpg";

export const title =
  "Efficiently Building a React + Tailwind App That Runs on Customer Sites (Production-Ready)";
export const slug = "en/article/2025-12/live-editor";
export const summary =
  "Build a banner injection system and learn how to develop front-end apps in this special environment.";

export const createdAt = dayjs("2025-12-20").toISOString();
export const updatedAt = dayjs("2025-12-20").toISOString();
export const image = i1;
export const imageAlt = "Sticky note photo.";
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
