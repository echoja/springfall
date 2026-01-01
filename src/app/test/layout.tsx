import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Giscus from "@modules/giscus";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader />
      <article className="mb-20">{children}</article>
      <Giscus />
    </>
  );
}
