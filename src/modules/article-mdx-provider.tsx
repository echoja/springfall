"use client";

import { MDXProvider } from "@mdx-js/react";

const components = {};

export default function ArticleMDXProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
