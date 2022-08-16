import type {
  ICodeElement,
  IContentElementProps,
} from "@modules/content/types";

const PublicCodeElement: React.FC<IContentElementProps<ICodeElement>> = ({
  children,
  element,
}) => {
  const Tag: keyof JSX.IntrinsicElements = element.tagName;

  return (
    <Tag className={(element.properties?.className ?? []).join(" ")}>
      {children}
    </Tag>
  );
};

export default PublicCodeElement;
