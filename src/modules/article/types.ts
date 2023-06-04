import type { StaticImageData } from "next/image";

export type ArticleItem = {
  title: string;
  url: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  image: StaticImageData;
  imageAlt: string;
};
