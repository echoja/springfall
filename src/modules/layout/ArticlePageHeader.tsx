"use client";

import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const ArticlePageHeader = () => {
  return (
    <header className="relative flex items-center justify-center w-full mb-24">
      <Link
        href="/"
        className="absolute left-0 p-2 transition -translate-y-1/2 border rounded shadow-sm top-1/2 hover:bg-gray-400/10 hover:opacity-90 border-gray-400/30 text-red"
      >
        <span className="sr-only">글 목록으로 이동</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-4 h-4 lucide lucide-list"
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </Link>
      <div>
        <h1 className="font-semibold leading-none">
          <Link className="inline-flex items-center gap-1" href="/">
            <Image
              aria-hidden
              alt=""
              src="/icons8-spa-flower-96.png"
              width={18}
              height={18}
              className="opacity-80 dark:invert"
            />
            봄가을 블로그
          </Link>
        </h1>
      </div>

      <div className="absolute right-0 -translate-y-1/2 top-1/2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default ArticlePageHeader;
