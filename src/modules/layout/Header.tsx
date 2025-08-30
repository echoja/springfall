"use client";

import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return (
    <header className="relative z-50 flex items-center justify-center w-full">
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

      {/* Theme toggle moved to Footer */}
    </header>
  );
};

export default Header;
