import type { RenderElementProps } from "slate-react";

export interface ICodeBlockComponentProps extends RenderElementProps {
  lang?: string;
}

function CodeBlock(props: RenderElementProps) {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
}

export default CodeBlock;
