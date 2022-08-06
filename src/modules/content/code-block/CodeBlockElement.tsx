import type {
  ICodeBlockElement,
  IContentElementProps,
} from "@modules/content/types";

const CodeBlockElement: React.FC<IContentElementProps<ICodeBlockElement>> = ({
  children,
  attributes,
  element,
}) => {
  const Tag: keyof JSX.IntrinsicElements = element.tagName;

  return (
    <Tag
      {...attributes}
      className={(element.properties?.className ?? []).join(" ")}
    >
      {children}
    </Tag>
  );
};

export default CodeBlockElement;
