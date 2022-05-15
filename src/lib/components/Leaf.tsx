import type { RenderLeafProps } from "slate-react";
import type { SetOptional } from "type-fest";

export function PublicLeaf(
  props: SetOptional<RenderLeafProps, "attributes" | "text">
) {
  const { children } = props;
  const { attributes, leaf } = props;

  switch (leaf.type) {
    case "TEXT":
      if (leaf.bold) {
        return (
          <span {...attributes}>
            <strong>{children}</strong>
          </span>
        );
      }

      if (leaf.code) {
        return (
          <span {...attributes}>
            <code>{children}</code>
          </span>
        );
      }

      if (leaf.kbd) {
        return (
          <span {...attributes}>
            <kbd>{children}</kbd>
          </span>
        );
      }

      if (leaf.strikethrough) {
        return (
          <span {...attributes}>
            <s>{children}</s>
          </span>
        );
      }

      if (leaf.underline) {
        return (
          <span {...attributes}>
            <u>{children}</u>
          </span>
        );
      }

      return <span {...attributes}>{children}</span>;

    case "ICON":
      return (
        <span {...attributes}>
          <span>아이콘: {leaf.icon}</span>
        </span>
      );

    case "LINK":
      return (
        <a
          {...attributes}
          href={leaf.url}
          target={leaf.internal ? undefined : "_blank"}
          rel="noreferrer"
        >
          {children}
        </a>
      );

    case "CODE_BLOCK_TEXT":
      return (
        <span {...attributes} contentEditable={false}>
          {children}
        </span>
      );

    default:
      return <span {...attributes}>{children}</span>;
  }
}

function Leaf(props: RenderLeafProps) {
  return <PublicLeaf {...props} />;
}

export default Leaf;
