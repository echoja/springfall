import type { ICodeLine, IContentElementProps } from "@modules/content/types";

const PublicCodeLine: React.FC<IContentElementProps<ICodeLine>> = ({
  children,
  attributes,
}) => {
  return <div {...attributes}>{children}</div>;
};

export default PublicCodeLine;
