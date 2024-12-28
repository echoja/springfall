import FloatingToc from "@components/FloatingToc";
import ArticlePageHeader from "@modules/layout/ArticlePageHeader";
import Utterances from "@modules/utterances";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticlePageHeader className="max-w-screen-md px-4 mx-auto mt-4 sm:mt-6 md:mt-8 sm:px-6 md:px-8" />
      <div className="flex max-w-screen-md px-4 mx-auto sm:px-6 md:px-8">
        <div className="w-full">
          <article className="mb-20">{children}</article>
          <Utterances />
        </div>

        <FloatingToc className="sticky self-start flex-none ml-4 top-2 " />
      </div>
    </>
  );
}
