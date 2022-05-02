import type { RenderLeafProps } from "slate-react";
import type { SetOptional } from "type-fest";

export function PublicLeaf(
  props: SetOptional<RenderLeafProps, "attributes" | "text">
) {
  let { children } = props;
  const { attributes, leaf } = props;

  if (leaf.type === "TEXT") {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
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
  } else if (leaf.type === "ICON") {
    children = <span>아이콘: {leaf.icon}</span>;
  } else if (leaf.type === "LINK") {
    children = (
      <a
        href={leaf.url}
        target={leaf.internal ? undefined : "_blank"}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
}

function Leaf(props: RenderLeafProps) {
  return <PublicLeaf {...props} />;
}

export default Leaf;
