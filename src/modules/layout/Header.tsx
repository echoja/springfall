import Tooltip from "@common/Tooltip";
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

      <div className="ml-auto">
        <Link className="p-4" href="/post/list/1">
          <FontAwesomeIcon className="w-4 h-4" icon={faList} />
        </Link>
      </div>
      <Tooltip content="asdf">
        <ThemeToggle />
      </Tooltip>
    </header>
  );
};

export default Header;
