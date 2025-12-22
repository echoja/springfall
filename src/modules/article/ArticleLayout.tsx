"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import ArticleFadeIn from "./ArticleFadeIn";
import FloatingToc from "./FloatingToc";

interface ArticleLayoutProps {
  children: React.ReactNode;
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  const articleRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  return (
    <div className="relative">
      <ArticleFadeIn articleRef={articleRef} className="mb-20 lg:pr-[260px]">
        {children}
      </ArticleFadeIn>
      <FloatingToc targetRef={articleRef} refreshKey={pathname} />
    </div>
  );
}
