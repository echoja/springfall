/* eslint-disable no-param-reassign */
import { deepclone } from "@common/util";
import { convert } from "@modules/content/code-block/convert";
import { nanoid } from "nanoid";
import type { DefaultTreeAdapterMap } from "parse5";
import { serializeOuter } from "parse5";
import type { Element, Node as SlateNode } from "slate";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";

const elementParserMap: {
  [tag: string]: (el: DefaultTreeAdapterMap["element"]) => Partial<Element>;
} = {
  a: (el) => ({
    type: "LINK",
    url: el.attrs.find((attr) => attr.name === "href")?.value,
  }),
  blockquote: () => ({ type: "BLOCKQUOTE" }),
  h1: () => ({ type: "HEADING", level: 1 }),
  h2: () => ({ type: "HEADING", level: 2 }),
  h3: () => ({ type: "HEADING", level: 3 }),
  h4: () => ({ type: "HEADING", level: 4 }),
  h5: () => ({ type: "HEADING", level: 5 }),
  h6: () => ({ type: "HEADING", level: 6 }),
  img: (el) => {
    const src = el.attrs.find((attr) => attr.name === "src")?.value;
    return {
      type: "IMAGE_UPLOAD_PLACEHOLDER",
      externalUrl: src || undefined,
      id: nanoid(),
    };
  },
  // img: (el: HTMLElement) => {
  //   const externalUrl: string | null = el.getAttribute("src");
  //   const id = nanoid();
  //   if (externalUrl) {
  //     srcToFile(externalUrl).then((file) => {
  //       if (!file) {
  //         removeImageUploadPlaceholder(editor, id);
  //         return;
  //       }
  //       uploadImage([{ id, file }]).forEach(({ promise }) => {
  //         promise.then((result) => {
  //           if (result.type === "IMAGE_UPLOAD_SUCCESS") {
  //             replaceImageUploadPlaceholder(editor, {
  //               id,
  //               height: result.height,
  //               url: result.url,
  //               width: result.width,
  //             });
  //           }
  //         });
  //       });
  //     });
  //   }

  //   return {
  //     type: "IMAGE_UPLOAD_PLACEHOLDER",
  //     externalUrl: externalUrl || undefined,
  //     id,
  //   };
  // },

  li: () => ({ type: "LIST_ITEM" }),
  ol: () => ({ type: "LIST", ordered: true }),
  p: () => ({ type: "PARAGRAPH" }),
  pre: () => ({ type: "CODE_BLOCK" }),
  ul: () => ({ type: "LIST", ordered: false }),
  table: () => ({ type: "TABLE" }),
  thead: () => ({ type: "TABLE_GROUP", role: "head" }),
  tbody: () => ({ type: "TABLE_GROUP", role: "body" }),
  tfoot: () => ({ type: "TABLE_GROUP", role: "foot" }),
  tr: () => ({ type: "TABLE_ROW" }),
  td: () => ({ type: "TABLE_CELL" }),
  th: () => ({ type: "TABLE_CELL", header: true }),
  hr: () => ({ type: "HR" }),
  iframe: (el) => ({ type: "RAW_HTML", html: serializeOuter(el) }),
  script: (el) => ({ type: "RAW_HTML", html: serializeOuter(el) }),
};

const spreadTextAttrs = (
  node: SlateNode,
  textAttr: Partial<Text>
): SlateNode => {
  if (Text.isText(node)) {
    return { ...textAttr, ...node };
  }

  const newChildren = node.children.map((child) => {
    return spreadTextAttrs(child, textAttr);
  }) as typeof node.children;

  const result = deepclone(node);
  result.children = newChildren;
  return result;
};

const textParserMap: {
  [tag: string]: (el: DefaultTreeAdapterMap["element"]) => Partial<Text>;
} = {
  code: () => ({ type: "TEXT", code: true }),
  del: () => ({ type: "TEXT", strikethrough: true }),
  em: () => ({ type: "TEXT", italic: true }),
  i: () => ({ type: "TEXT", italic: true }),
  s: () => ({ type: "TEXT", strikethrough: true }),
  strong: () => ({ type: "TEXT", bold: true }),
  u: () => ({ type: "TEXT", underline: true }),
  cite: () => ({ type: "TEXT", cite: true }),
};

export const isTextNode = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["textNode"] => {
  return node.nodeName === "#text";
};

export const isCommentNode = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["commentNode"] => {
  return node.nodeName === "#comment";
};

export const isDocumentType = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["documentType"] => {
  return node.nodeName === "#documentType";
};

export const isDocument = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["document"] => {
  return node.nodeName === "#document";
};

export const isDocumentFragment = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["documentFragment"] => {
  return node.nodeName === "#document-fragment";
};

export const isTemplate = (
  node: DefaultTreeAdapterMap["node"]
): node is DefaultTreeAdapterMap["template"] => {
  return node.nodeName === "template";
};

// eslint-disable-next-line complexity
export const htmlToSlateFragment = (
  node: DefaultTreeAdapterMap["node"]

  // TODO: 복잡도 낮추기
  // eslint-disable-next-line sonarjs/cognitive-complexity
): SlateNode | null | SlateNode[] => {
  if (isTextNode(node)) {
    const text = node.value.replace(/([ \t]+$)|(^[ \t]+)/, "");
    return text === "\n" ? null : { type: "TEXT", text: node.value ?? "" };
  }

  if (node.nodeName === "br") {
    return { type: "TEXT", text: "\n" };
  }

  if (
    isCommentNode(node) ||
    isDocumentType(node) ||
    isTemplate(node) ||
    node.nodeName === "head"
  ) {
    return null;
  }

  const { nodeName } = node;
  let parent = node;

  // TODO: 코드 블록 관련된 곳으로 옮기기
  if (
    nodeName === "pre" &&
    node.childNodes[0] &&
    node.childNodes[0].nodeName === "code"
  ) {
    [parent] = node.childNodes;
  }

  let children = parent.childNodes
    .map((child) => htmlToSlateFragment(child))
    .flat();

  if (children.length === 0) {
    children = [{ type: "TEXT", text: "" }];
  }

  if (
    nodeName === "body" ||
    nodeName === "html" ||
    isDocument(node) ||
    isDocumentFragment(node) ||
    nodeName === "span" ||
    nodeName === "div"
  ) {
    return jsx("fragment", {}, children);
  }

  const elementParser = elementParserMap[nodeName];
  if (elementParser) {
    const attrs = elementParser(node);
    const result = jsx("element", attrs, children);

    // TODO: 코드 블록 관련된 곳으로 옮기기
    if (result.type === "CODE_BLOCK") {
      return convert(result, "plaintext");
    }

    return result;
  }
  const textParser = textParserMap[nodeName];
  if (textParser) {
    const attrs = textParser(node);

    return children.map((child) => {
      if (!child || child.type === "TEXT") {
        return jsx("text", attrs, child);
      }
      return spreadTextAttrs(child, attrs);
    });
  }

  // TODO: 지원해야 함
  if (nodeName === "figcaption" || nodeName === "figure") {
    return null;
  }

  // eslint-disable-next-line no-console
  console.error(node);
  throw new Error(`Unknown node!: ${node.nodeName}`);
};
