import type { CommonRenderElementProps } from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

export type IParagraphProps = CommonRenderElementProps;

const { EditorComponent: Paragraph, PublicComponent } =
  createElementComponent<IParagraphProps>(({ children, attributes }) => {
    return <p {...attributes}>{children}</p>;
  });

export const PublicParagraph = PublicComponent;

export default Paragraph;
