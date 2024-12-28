import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export function Heading2({ children, ...props }: ComponentProps<"h2">) {
  return (
    <h2 {...props} className={twMerge(props.className, style.heading2)}>
      {children}
    </h2>
  );
}

export function Heading3({ children, ...props }: ComponentProps<"h3">) {
  return (
    <h3 {...props} className={twMerge(props.className, style.heading3)}>
      {children}
    </h3>
  );
}

export function Heading4({ children, ...props }: ComponentProps<"h4">) {
  return (
    <h4 {...props} className={twMerge(props.className, style.heading4)}>
      {children}
    </h4>
  );
}

export function Heading5({ children, ...props }: ComponentProps<"h5">) {
  return (
    <h5 {...props} className={twMerge(props.className, style.heading5)}>
      {children}
    </h5>
  );
}

export function Heading6({ children, ...props }: ComponentProps<"h6">) {
  return (
    <h6 {...props} className={twMerge(props.className, style.heading6)}>
      {children}
    </h6>
  );
}

export function Paragraph({ children, ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={twMerge(props.className, style.paragraph)}>
      {children}
    </p>
  );
}

export function Quote({ children, ...props }: ComponentProps<"blockquote">) {
  return (
    <blockquote {...props} className={twMerge(props.className, style.quote)}>
      {children}
    </blockquote>
  );
}

export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className={style["table-wrapper-1"]}>
      <div className={style["table-wrapper-2"]}>
        <div className={style["table-wrapper-3"]}>
          <table className={style.table}>{children}</table>
        </div>
      </div>
    </div>
  );
}

export function THead({ children }: { children?: React.ReactNode }) {
  return <thead className={style.thead}>{children}</thead>;
}

export function TBody({ children }: { children?: React.ReactNode }) {
  return <tbody className={style.tbody}>{children}</tbody>;
}

export function TFoot({ children }: { children?: React.ReactNode }) {
  return <tfoot className={style.tfoot}>{children}</tfoot>;
}

export function TR({ children }: { children?: React.ReactNode }) {
  return <tr className={style.tr}>{children}</tr>;
}

export function TH({ children }: { children?: React.ReactNode }) {
  return <th className={style.th}>{children}</th>;
}

export function TD({ children }: { children?: React.ReactNode }) {
  return <td className={style.td}>{children}</td>;
}

export function Details({ children }: { children?: React.ReactNode }) {
  return <details className={style.details}>{children}</details>;
}

export function Summary({ children }: { children?: React.ReactNode }) {
  return <summary className={style.summary}>{children}</summary>;
}
