"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ArticlePageHeader = () => {
  return (
    <header className="relative flex items-center justify-center w-full mb-24">
      <Link
        href="/"
        className="absolute left-0 p-2 transition -translate-y-1/2 rounded-sm top-1/2 hover:bg-gray-400/10 hover:opacity-90"
        aria-label="글 목록으로 이동"
      >
        <ArrowLeft className="w-4 h-4" />
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

      {/* <Link
        href="/portfolio"
        className="absolute right-0 hover:no-underline py-2 px-3 text-sm transition rounded-sm hover:bg-gray-400/10 hover:opacity-90"
      >
        Portfolio
      </Link> */}
    </header>
  );
};

export default ArticlePageHeader;
