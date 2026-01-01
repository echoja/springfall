import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Giscus from "@modules/giscus";
import ArticleLayout from "@modules/article/ArticleLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "page-type": "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader />
      <ArticleLayout>{children}</ArticleLayout>
      <Giscus className="lg:-translate-x-38" />
    </>
  );
}
