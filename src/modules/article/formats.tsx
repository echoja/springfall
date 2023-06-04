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

export function Heading1({ children }: { children?: React.ReactNode }) {
  return <h1 className={style.heading1}>{children}</h1>;
}

export function Heading2({ children }: { children?: React.ReactNode }) {
  return <h2 className={style.heading2}>{children}</h2>;
}

export function Heading3({ children }: { children?: React.ReactNode }) {
  return <h3 className={style.heading3}>{children}</h3>;
}

export function Heading4({ children }: { children?: React.ReactNode }) {
  return <h4 className={style.heading4}>{children}</h4>;
}

export function Heading5({ children }: { children?: React.ReactNode }) {
  return <h5 className={style.heading5}>{children}</h5>;
}

export function Heading6({ children }: { children?: React.ReactNode }) {
  return <h6 className={style.heading6}>{children}</h6>;
}

export function Paragraph({ children }: { children?: React.ReactNode }) {
  return <p className={style.paragraph}>{children}</p>;
}

export function Quote({ children }: { children?: React.ReactNode }) {
  return <blockquote className={style.quote}>{children}</blockquote>;
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className={style["inline-code"]}>{children}</code>;
}
