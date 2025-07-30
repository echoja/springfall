import { TaehoonGptButton } from "@components/TaehoonGptButton";
import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";
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
      <article className="mb-20">{children}</article>
      <TaehoonGptButton />
      <Utterances />
    </>
  );
}
