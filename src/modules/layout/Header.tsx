import { faList } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center w-full">
      <h1 className="text-2xl font-semibold">
        <Link href="/">봄가을</Link>
      </h1>

      <div className="ml-auto mr-2">
        <Link
          className="p-4 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
          href="/post/list/1"
        >
          <FontAwesomeIcon className="w-4 h-4" icon={faList} />
          <span className="sr-only">글 목록</span>
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
