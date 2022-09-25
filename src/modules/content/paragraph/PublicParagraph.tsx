import type {
  CommonRenderElementProps,
  IContentElementProps,
  IParagraph,
} from "@modules/content/types";

export type IParagraphProps = CommonRenderElementProps;

const PublicParagraph: React.FC<IContentElementProps<IParagraph>> = ({
  children,
  empty,
}) => {
  if (empty) {
    return (
      <p>
        <br />
      </p>
    );
  }

  return <p>{children}</p>;
};

export default PublicParagraph;
