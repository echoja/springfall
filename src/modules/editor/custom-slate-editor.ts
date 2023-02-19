import { memo } from "react";
import { createEditor, Editor, Element } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

import { withLinkBlock } from "../content/link/api";
import type { CommonRenderElementProps } from "../content/types";
import { withImage } from "@modules/content/image/slate-api";

import withHtml from "./plugins/withHtml";
import withShortcuts from "./plugins/withShortcuts";

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

export function getEditor(): Editor {
  return [
    withHistory,
    withReact,
    withCodeBlock,
    withLinkBlock,
    withHtml,
    withImage,
    withShortcuts,
  ].reduce((acc, plugin) => plugin(acc), createEditor());
}
