"use client";

import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-semibold">
        <Link href="/">봄가을</Link>
      </h1>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
