/* eslint-disable no-param-reassign */
import type { Editor, Element, Node, Text } from "slate";
import { Transforms } from "slate";
import { jsx } from "slate-hyperscript";

const ELEMENT_TAGS: {
  [tag: string]: (el: HTMLElement) => Partial<Element>;
} = {
  A: (el: HTMLElement) => ({
    type: "LINK",
    url: el.getAttribute("href") || undefined,
  }),
  // TODO: 구현
  BLOCKQUOTE: () => ({ type: "PARAGRAPH" }),
  H1: () => ({ type: "HEADING", level: 1 }),
  H2: () => ({ type: "HEADING", level: 2 }),
  H3: () => ({ type: "HEADING", level: 3 }),
  H4: () => ({ type: "HEADING", level: 4 }),
  H5: () => ({ type: "HEADING", level: 5 }),
  H6: () => ({ type: "HEADING", level: 6 }),
  IMG: (el: HTMLElement) => ({
    type: "IMAGE",
    url: el.getAttribute("src") || undefined,
  }),
  LI: () => ({ type: "LIST_ITEM" }),
  OL: () => ({ type: "LIST", ordered: true }),
  P: () => ({ type: "PARAGRAPH" }),
  PRE: () => ({ type: "CODE_BLOCK" }),
  UL: () => ({ type: "LIST", ordered: false }),
};

const TEXT_TAGS: { [tag: string]: (el: HTMLElement) => Partial<Text> } = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const deserialize = (
  el: HTMLElement
): (Node | string | null)[] | Node | string | null => {
  if (el.nodeType === 3) {
    return el.textContent === "\n" ? null : el.textContent;
  }
  if (el.nodeType !== 1) {
    return null;
  }
  if (el.nodeName === "BR") {
    return { type: "TEXT", text: "\n" };
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0] as HTMLElement;
  }

  let children = Array.from(parent.childNodes)
    .map((node) => deserialize(node as HTMLElement))
    .flat();

  if (children.length === 0) {
    children = [{ type: "TEXT", text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName]?.(el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName]?.(el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

const withHtml = (editor: Editor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);

      if (fragment) {
        if (Array.isArray(fragment)) {
          const filtered = fragment.filter(
            (n): n is Exclude<typeof n, null | string> =>
              Boolean(n) && typeof n !== "string"
          );

          Transforms.insertFragment(editor, filtered);
        } else if (typeof fragment !== "string") {
          Transforms.insertFragment(editor, [fragment]);
        }
      }
      return;
    }

    insertData(data);
  };

  return editor;
};

export default withHtml;
