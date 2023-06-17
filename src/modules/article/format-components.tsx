import Link from "next/link";

import style from "./style.module.css";

// eslint-disable-next-line import/prefer-default-export
export function Anchor({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      className={style.link}
      target="_blank"
      rel="noopener noreferrer"
      href={href || ""}
    >
      {children}
    </Link>
  );
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className={style["inline-code"]}>{children}</code>;
}
