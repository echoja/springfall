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
          className="relative my-1 w-fit rounded-sm border border-zinc-500 bg-black/30 px-2 py-1 font-sans whitespace-break-spaces text-zinc-200 select-none"
        >
          <div
            style={{ left: `${column - 1}ch` }}
            className="absolute -top-px h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-zinc-500 bg-zinc-800"
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
      <div className="box-content min-w-[1ch] pl-2 opacity-70 select-none">
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
        className="-mx-0.5 rounded-sm px-0.5 py-0"
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
  const highlighted = await highlight(codeblock, "github-dark");

  return (
    <div className="relative">
      <div
        className="relative my-10 overflow-x-scroll rounded-sm text-sm leading-[22px] text-gray-300 shadow-md"
        style={{ backgroundColor: "#272A30" }}
      >
        {highlighted.meta ? (
          <div className="border-b border-gray-600 px-4 py-3 font-mono text-xs text-gray-400">
            {highlighted.meta}
          </div>
        ) : null}

        <Pre
          className="m-0 bg-transparent py-3.5 text-gray-300"
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
  const isHeadingAnchor = (restProps.className || "")
    .split(" ")
    .includes("heading-anchor");

  if (isHeadingAnchor) {
    // Preserve exact classes and attributes for heading anchors to keep styles working
    return (
      <a {...restProps} href={href || ""}>
        {children}
      </a>
    );
  }

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
        <ExternalLink size="0.8em" className="text-brand-400 ml-0.5 inline" />
      )}
    </Link>
  );
}

export function InlineCode({ children }: { children?: React.ReactNode }) {
  return <code className={style["inline-code"]}>{children}</code>;
}
