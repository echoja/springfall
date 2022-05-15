import { memo } from "react";
import { createEditor, Editor, Element } from "slate";
import { withHistory } from "slate-history";
import type { RenderElementProps } from "slate-react";
import { withReact } from "slate-react";

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
    PublicComponent: memo(Component),
    EditorComponent: memo((props) => <Component {...props} />),
  };
}

export function withCodeBlock(editor: Editor): Editor {
  return editor;
}

export function getEditor(): Editor {
  return [withHistory, withReact, withCodeBlock].reduce(
    (acc, plugin) => plugin(acc),
    createEditor()
  );
}
