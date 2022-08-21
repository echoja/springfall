import type { RenderPlaceholderProps } from "slate-react";

export default function renderPlaceholder({
  children,
  attributes,
}: RenderPlaceholderProps) {
  return (
    <div {...attributes}>
      <p>{children}</p>
    </div>
  );
}
