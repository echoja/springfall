import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full flex items-center">
      <h1 className="text-2xl font-semibold">
        <Link href="/">봄가을</Link>
      </h1>

      <div className="ml-auto mr-3">
        <Link href="/list">
          <a className="hover:underline">글 목록</a>
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
