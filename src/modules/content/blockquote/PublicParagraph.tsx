import type {
  CommonRenderElementProps,
  IBlockquote,
  IContentElementProps,
} from "@modules/content/types";

export type IBlockquoteProps = CommonRenderElementProps;

const PublicBlockquote: React.FC<IContentElementProps<IBlockquote>> = ({
  children,
  empty,
}) => {
  if (empty) {
    return (
      <blockquote>
        <br />
      </blockquote>
    );
  }

  return <blockquote>{children}</blockquote>;
};

export default PublicBlockquote;
