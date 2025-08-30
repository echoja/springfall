import { TaehoonGptButton } from "@components/TaehoonGptButton";
import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";
import ArticleFadeIn from "@modules/article/ArticleFadeIn";
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
      <ArticleFadeIn className="mb-20">{children}</ArticleFadeIn>
      <TaehoonGptButton />
      <Utterances />
    </>
  );
}
