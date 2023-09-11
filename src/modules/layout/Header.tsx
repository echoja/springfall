"use client";

import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="relative flex items-center justify-center w-full">
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

export default Header;
