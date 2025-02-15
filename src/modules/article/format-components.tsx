import { CodeCopyButton } from "@components/CodeCopyButton";
import type {
  AnnotationHandler,
  BlockAnnotation,
  InlineAnnotation,
  RawCode,
} from "codehike/code";
import { InnerLine, Pre, highlight } from "codehike/code";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import gitHubDark from "./github-dark";
import style from "./style.module.css";

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
          className="relative px-2 py-1 my-1 font-sans border rounded-sm select-none w-fit bg-black/30 border-zinc-500 whitespace-break-spaces text-zinc-200"
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

const className: AnnotationHandler = {
  name: "className",
  Block: ({ annotation, children }) => (
    <div className={annotation.query}>{children}</div>
  ),
  Inline: ({ annotation, children }) => (
    <span className={annotation.query}>{children}</span>
  ),
};

const diff: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  transform: (annotation: BlockAnnotation) => {
    const color = annotation.query == "-" ? "#f85149" : "#3fb950";
    return [annotation, { ...annotation, name: "mark", query: color }];
  },
  Line: ({ annotation, ...props }) => (
    <>
      <div className="min-w-[1ch] box-content opacity-70 pl-2 select-none">
        {annotation?.query}
      </div>
      <InnerLine
        merge={props}
        className={twMerge(annotation?.query == "-" && "select-none")}
      />
    </>
  ),
};

const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const color = annotation?.query || "rgb(14 165 233)";
    return (
      <div
        className="flex"
        style={{
          borderLeft: "solid 2px transparent",
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.25)`,
        }}
      >
        <InnerLine merge={props} className="flex-1 px-4" />
      </div>
    );
  },
  Inline: ({ annotation, children }) => {
    const color = annotation?.query || "rgb(14 165 233)";
    return (
      <span
        className="rounded-sm px-0.5 py-0 -mx-0.5"
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
          background: `rgb(from ${color} r g b / 0.13)`,
        }}
      >
        {children}
      </span>
    );
  },
};

export async function Code({ codeblock }: { codeblock: RawCode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const highlighted = await highlight(codeblock, "github-dark");

  return (
    <div className="relative">
      <div
        className="relative rounded-sm text-sm my-10 shadow-md overflow-x-scroll leading-[22px] text-gray-300"
        style={{ backgroundColor: gitHubDark.colors["editor.background"] }}
      >
        {highlighted.meta ? (
          <div className="px-4 py-3 font-mono text-xs text-gray-400 border-b border-gray-600">
            {highlighted.meta}
          </div>
        ) : null}

        <Pre
          className="py-3.5 m-0 text-gray-300 bg-transparent"
          code={highlighted}
          handlers={[callout, className, mark, diff]}
        />
      </div>
      <CodeCopyButton text={highlighted.code} />
    </div>
  );
}

export function Strong({ children }: { children?: React.ReactNode }) {
  return <strong className={style.strong}>{children}</strong>;
}

export function Anchor({
  children,
  href,
  ...restProps
}: React.ComponentProps<"a">) {
  const isInternal = href?.startsWith("/article") || href?.startsWith("#");

  return (
    <Link
      {...restProps}
      className={twMerge(restProps.className, style.link)}
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

export function InlineCode({ children }: { children?: React.ReactNode }) {
  return <code className={style["inline-code"]}>{children}</code>;
}
