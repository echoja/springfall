import type { CommonRenderLeafProps, IRenderTextProps } from "@lib/types";

export function Text(props: IRenderTextProps) {
  const { children, leaf, attributes } = props;

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

    case "LINK":
      return (
        <a
          href={leaf.url}
          target={leaf.internal ? undefined : "_blank"}
          rel="noreferrer"
        >
          {children}
        </a>
      );

    case "CODE_BLOCK_TEXT":
      return leaf.isNewline ? <br /> : <span>{children}</span>;

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
      return <span {...attributes}>{children}</span>;

    default:
      return <span {...attributes}>{children}</span>;
  }
}

export default Leaf;
