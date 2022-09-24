import dynamic from "next/dynamic";
import Link from "next/link";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div style={{ width: "16px" }} />,
});

const Header = () => {
  return (
    <header className="flex items-center w-full">
      <h1 className="text-2xl font-semibold">
        <Link href="/">봄가을</Link>
      </h1>

      <div className="ml-auto mr-3">
        <Link href="/post/list">
          <a className="py-4">글 목록</a>
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
