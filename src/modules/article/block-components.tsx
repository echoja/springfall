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
