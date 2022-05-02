import type { RenderElementProps } from "slate-react";

function Paragraph(props: RenderElementProps) {
  const { attributes, children } = props;

  return (
    <p className="mb-2" {...attributes}>
      {children}
    </p>
  );
}

export default Paragraph;
