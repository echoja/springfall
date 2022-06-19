import { createElementComponent } from "@lib/editor";
import type { CommonRenderElementProps } from "@lib/types";

export type IParagraphProps = CommonRenderElementProps;

const { EditorComponent: Paragraph, PublicComponent } =
  createElementComponent<IParagraphProps>(({ children, attributes }) => {
    return <p {...attributes}>{children}</p>;
  });

export const PublicParagraph = PublicComponent;

export default Paragraph;
