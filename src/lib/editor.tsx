import isUrl from "is-url";
import { memo } from "react";
import { createEditor, Editor, Element } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

import type { CommonRenderElementProps } from "./types";

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

export function createElementComponent<T extends CommonRenderElementProps>(
  Component: React.FC<T>
): {
  EditorComponent: React.FC<T>;
  PublicComponent: React.FC<T>;
} {
  return {
    PublicComponent: memo(Component),
    EditorComponent: memo(Component),
  };
}

export function withCodeBlock(editor: Editor): Editor {
  return editor;
}

export function withLinkBlock(editor: Editor): Editor {
  const result = { ...editor };

  result.isInline = (element) =>
    ["link", "button"].includes(element.type) || editor.isInline(element);

  result.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(result, text);
    } else {
      editor.insertText(text);
    }
  };

  result.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(result, text);
    } else {
      editor.insertData(data);
    }
  };

  return result;
}

export function getEditor(): Editor {
  return [withHistory, withReact, withCodeBlock].reduce(
    (acc, plugin) => plugin(acc),
    createEditor()
  );
}
