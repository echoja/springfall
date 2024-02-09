import type { Category } from "@modules/category";
import type { StaticImageData } from "next/image";

export type ArticleItem = {
  title: string;
  url: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  image: StaticImageData;
  imageAlt: string;
  category?: Category;
  tags?: string[];
  series?: { name: string; order: string };
};
