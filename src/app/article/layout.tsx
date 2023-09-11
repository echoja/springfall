import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader />
      <article className="mb-20">{children}</article>
      <Utterances />
    </>
  );
}
