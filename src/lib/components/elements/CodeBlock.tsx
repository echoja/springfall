import { createElementComponent } from "@lib/editor";
import type { RenderElementProps } from "slate-react";

export interface ICodeBlockProps extends RenderElementProps {
  lang?: string;
}

const { EditorComponent: CodeBlock, PublicComponent } =
  createElementComponent<ICodeBlockProps>(({ children, attributes }) => {
    return (
      <pre {...attributes}>
        <code>{children}</code>
      </pre>
    );
  });

export const PublicCodeBlock = PublicComponent;

export default CodeBlock;
