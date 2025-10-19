import Header from "@modules/layout/Header";
import PortfolioContent from "@modules/portfolio/PortfolioContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "프로젝트와 경력을 모아둔 포트폴리오 페이지",
  other: {
    "page-type": "portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <PortfolioContent />
      </main>
    </>
  );
}
