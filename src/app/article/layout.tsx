import FloatingToc from "@components/FloatingToc";
import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader className="max-w-[1200px] pl-4 pr-40 mt-4" />
      <div className="flex max-w-[1200px] px-4 ">
        <div className="w-full">
          <article className="mb-20">{children}</article>
          <Utterances />
        </div>

        <FloatingToc className="sticky self-start flex-none ml-4 top-2 " />
      </div>
    </>
  );
}
