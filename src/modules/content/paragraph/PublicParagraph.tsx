import type {
  CommonRenderElementProps,
  IContentElementProps,
  IParagraph,
} from "@modules/content/types";

export type IParagraphProps = CommonRenderElementProps;

const PublicParagraph: React.FC<IContentElementProps<IParagraph>> = ({
  attributes,
  children,
}) => {
  return <p {...attributes}>{children}</p>;
};

export default PublicParagraph;
