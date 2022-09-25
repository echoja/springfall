import type { CommonRenderLeafProps } from "@modules/content/types";

import style from "./style.module.css";

const Text: React.FC<CommonRenderLeafProps> = (
  props: CommonRenderLeafProps
) => {
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
};

export default Text;
