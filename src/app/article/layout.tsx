import ArticleMDXProvider from "@modules/article/article-mdx-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ArticleMDXProvider>
      <article>{children}</article>
    </ArticleMDXProvider>
  );
}
