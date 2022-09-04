import type {
  CommonRenderLeafProps,
  IRenderTextProps,
} from "@modules/content/types";

import style from "./leaf.module.css";

export function Text(props: IRenderTextProps) {
  const { leaf, attributes } = props;
  let { children } = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.code) {
    children = <code className={style.code}>{children}</code>;
  }

  if (leaf.kbd) {
    children = <kbd>{children}</kbd>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

export function PublicLeaf({ children, leaf, text }: CommonRenderLeafProps) {
  switch (leaf.type) {
    case "TEXT":
      return <Text {...{ leaf, text }}>{children}</Text>;
    case "ICON":
      return (
        <span>
          <span>아이콘: {leaf.icon}</span>
        </span>
      );

    default:
      return <span>{children}</span>;
  }
}

export function Leaf({
  children,
  leaf,
  text,
  attributes,
}: CommonRenderLeafProps) {
  switch (leaf.type) {
    case "TEXT":
      return <Text {...{ leaf, attributes, text }}>{children}</Text>;
    case "ICON":
      return (
        <span {...attributes}>
          <span>아이콘: {leaf.icon}</span>
        </span>
      );

    default:
      return <span {...attributes}>{children}</span>;
  }
}

export default Leaf;
