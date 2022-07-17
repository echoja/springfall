import isUrl from "is-url";
import { Editor, Element, Range, Transforms } from "slate";

import type { ILink } from "../types";

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "LINK",
  });
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "LINK",
  });
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: ILink = {
    type: "LINK",
    url,
    children: isCollapsed ? [{ type: "TEXT", text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

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
