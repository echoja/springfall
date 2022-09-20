import type {
  CommonRenderElementProps,
  IContentElementProps,
  IParagraph,
} from "@modules/content/types";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

export type IParagraphProps = CommonRenderElementProps;

const Paragraph: React.FC<IContentElementProps<IParagraph>> = ({
  attributes,
  children,
}) => {
  const selected = useSelected();

  return (
    <div className={twMerge(selected && "ring-1 ring-offset-8")}>
      <p {...attributes}>{children}</p>
    </div>
  );
};

export default Paragraph;
