import style from "./style.module.css";

export function OrderedList({ children }: { children?: React.ReactNode }) {
  return <ol className={style.ol}>{children}</ol>;
}

export function UnorderdList({ children }: { children?: React.ReactNode }) {
  return <ul className={style.ul}>{children}</ul>;
}

export function ListItem({ children }: { children?: React.ReactNode }) {
  return <li className={style.li}>{children}</li>;
}
