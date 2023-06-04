declare module "*.mdx" {
  import type { Metadata } from "next";
  import type { StaticImageData } from "next/image";

  export const metadata: Metadata | undefined;
  export const title: string | undefined;
  export const url: string | undefined;
  export const summary: string | undefined;
  export const createdAt: string | undefined;
  export const updatedAt: string | undefined;
  export const image: StaticImageData;
  export const imageAlt: string | undefined;
}
