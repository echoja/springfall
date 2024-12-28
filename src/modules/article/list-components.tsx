import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export function OrderedList({
  children,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol {...props} className={twMerge(props.className, style.ol)}>
      {children}
    </ol>
  );
}

export function UnorderdList({
  children,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className={twMerge(props.className, style.ul)}>
      {children}
    </ul>
  );
}

export function ListItem({ children, ...props }: React.ComponentProps<"li">) {
  return (
    <li {...props} className={twMerge(props.className, style.li)}>
      {children}
    </li>
  );
}
