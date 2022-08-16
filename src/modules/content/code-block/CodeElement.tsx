import type {
  ICodeElement,
  IContentElementProps,
} from "@modules/content/types";

const CodeElement: React.FC<IContentElementProps<ICodeElement>> = ({
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

export default CodeElement;
