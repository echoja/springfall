declare module "*/page.mdx" {
  import type { Metadata } from "next";
  import type { StaticImageData } from "next/image";

  import type { ArticleItem } from "@modules/article/types";

  import MDX from "*.mdx";

  export default MDX;

  export const metadata: Metadata;
  export const title: string;
  export const url: string;
  export const summary: string;
  export const createdAt: string;
  export const updatedAt: string;
  export const image: StaticImageData;
  export const imageAlt: string;
  export const item: ArticleItem;
}
