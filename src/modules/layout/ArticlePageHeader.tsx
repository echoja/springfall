"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { uiText } from "@modules/i18n/strings";
import { useLocale } from "@modules/i18n/useLocale";

const ArticlePageHeader = () => {
  const locale = useLocale();
  const text = uiText[locale];

  return (
    <header className="relative mb-24 flex items-center justify-center lg:-mx-38">
      <Link
        href="/"
        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-sm p-2 transition hover:bg-gray-400/10 hover:opacity-90"
        aria-label={text.backToList}
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div>
        <h1 className="leading-none font-semibold">
          <Link className="inline-flex items-center gap-1" href="/">
            <Image
              aria-hidden
              alt=""
              src="/icons8-spa-flower-96.png"
              width={18}
              height={18}
              className="opacity-80 dark:invert"
            />
            {text.headerTitle}
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
