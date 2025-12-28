import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Disqus from "@modules/disqus";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader />
      <article className="mb-20">{children}</article>
      <Disqus />
    </>
  );
}
