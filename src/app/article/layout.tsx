import ArticleMDXProvider from "@modules/article-mdx-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ArticleMDXProvider>{children}</ArticleMDXProvider>;
}
