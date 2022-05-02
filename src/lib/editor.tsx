import { Editor, Element } from "slate";
import type { RenderElementProps } from "slate-react";

import type { PublicElementComponent } from "./types";

export const selectionFilteredByType = (
  editor: Editor,
  type: Element["type"]
) => {
  const { selection } = editor;
  if (!selection) return false;

  return Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    })
  );
};

export function createElementComponent<T extends RenderElementProps>(
  Component: PublicElementComponent<T>
): {
  EditorComponent: React.FC<T>;
  PublicComponent: PublicElementComponent<T>;
} {
  return {
    PublicComponent: Component,
    EditorComponent: (props) => <Component {...props} />,
  };
}
