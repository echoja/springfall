"use client";

import Link from "next/link";

import FaSolidList from "@modules/icons/FaSolidList";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center w-full">
      <h1 className="text-2xl font-semibold">
        <Link href="/">봄가을</Link>
      </h1>

      <div className="ml-auto mr-2">
        <Link
          className="inline-flex p-4 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
          href="/post/list/1"
        >
          <FaSolidList className="w-4 h-4" />
          <span className="sr-only">글 목록</span>
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
