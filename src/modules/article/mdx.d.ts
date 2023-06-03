declare module "*.mdx" {
  import type { Metadata } from "next";

  // eslint-disable-next-line import/prefer-default-export
  export const metadata: Metadata | undefined;
}
