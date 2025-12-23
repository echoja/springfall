import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";
import type { Metadata } from "next";
import ArticleLayout from "@modules/article/ArticleLayout";

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
      <Utterances />
    </>
  );
}
