import { createElementComponent } from "@lib/editor";
import type { RenderElementProps } from "slate-react";

export type IParagraphProps = RenderElementProps;

const { EditorComponent: Paragraph, PublicComponent } =
  createElementComponent<IParagraphProps>(({ children, attributes }) => {
    return (
      <p className="mb-2" {...attributes}>
        {children}
      </p>
    );
  });

export const PublicParagraph = PublicComponent;

export default Paragraph;
