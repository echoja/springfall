import Link from "next/link";

import { CopyButton } from "@components/CopyButton";
import type {
  AnnotationHandler,
  InlineAnnotation,
  RawCode,
} from "codehike/code";
import { Pre, highlight } from "codehike/code";
import { ExternalLink } from "lucide-react";
import style from "./style.module.css";

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

const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation;
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    };
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data;
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="relative px-2 py-1 my-1 font-sans border rounded select-none w-fit bg-black/30 border-zinc-500 whitespace-break-spaces text-zinc-200"
        >
          <div
            style={{ left: `${column - 1}ch` }}
            className="absolute border-l border-t border-zinc-500 w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"
          />
          {annotation.query}
        </div>
      </>
    );
  },
};

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "nord");

  return (
    <div className="relative">
      <div className="relative px-3 py-2 rounded bg-[rgba(46,52,64,0.95)] text-sm my-10 shadow-md overflow-x-scroll">
        {highlighted.meta ? (
          <div className="px-3 py-2 mb-2 -mx-3 -mt-2 font-mono text-xs border-b text-zinc-400 border-zinc-600">
            {highlighted.meta}
          </div>
        ) : null}

        <Pre
          className="m-0 bg-transparent"
          code={highlighted}
          handlers={[callout]}
        />
      </div>
      <CopyButton text={highlighted.code} />
    </div>
  );
}

// export function Code({ children }: { children?: React.ReactNode }) {
//   return <code className={style["inline-code"]}>{children}</code>;
// }

export function Strong({ children }: { children?: React.ReactNode }) {
  return <strong className={style.strong}>{children}</strong>;
}
