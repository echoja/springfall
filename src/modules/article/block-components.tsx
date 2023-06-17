import style from "./style.module.css";

export function Blockquote({ children }: { children?: React.ReactNode }) {
  return <h1 className={style.blockquote}>{children}</h1>;
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
