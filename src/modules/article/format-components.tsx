import Link from "next/link";

import style from "./style.module.css";

import { ExternalLink } from "lucide-react";

// eslint-disable-next-line import/prefer-default-export
export function Anchor({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  const isInternal = href?.startsWith("/article");

  return (
    <Link
      className={style.link}
      {...(!isInternal
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      href={href || ""}
    >
      {children}
      {!isInternal && (
        <ExternalLink size="0.8em" className=" text-brand-400 ml-0.5 inline" />
      )}
    </Link>
  );
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className={style["inline-code"]}>{children}</code>;
}

export function Strong({ children }: { children?: React.ReactNode }) {
  return <strong className={style.strong}>{children}</strong>;
}
