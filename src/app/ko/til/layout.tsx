import Giscus from "@modules/giscus";
import type { Metadata } from "next";
import Header from "@modules/layout/Header";

export const metadata: Metadata = {
  other: {
    "page-type": "til",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-12 mb-24">
        <article>{children}</article>
      </main>
      <Giscus />
    </>
  );
}
