/* eslint-disable no-param-reassign */
import { deepclone } from "@common/util";
import { convert } from "@modules/content/code-block/convert";
import { XMLParser } from "fast-xml-parser";
import { nanoid } from "nanoid";
import type { DefaultTreeAdapterMap } from "parse5";
import { parse } from "parse5";
import type { Element, Node as SlateNode } from "slate";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";

import type { WordpressJSON, WordpressPost } from "./type";

export async function parseXml(xmlData: string | Buffer) {
  const xmlParser = new XMLParser();
  const jObj = xmlParser.parse(xmlData);
  return jObj as WordpressJSON;
}

export function getPublishedPost(json: WordpressJSON): WordpressPost[] {
  const { rss } = json;

  if (!rss) {
    throw new Error("No rss");
  }

  const { channel } = rss;

  if (!channel) {
    throw new Error("No channel");
  }

  const { item } = channel;

  if (!item) {
    throw new Error("No item");
  }

  return item
    .filter((i) => {
      return i["wp:status"] === "publish" && i["wp:post_type"] === "post";
    })
    .map((i) => ({
      title: i.title ?? "",
      content: i["content:encoded"] ?? "",
      post_id: i["wp:post_id"] ?? "",
      pubDate: i.pubDate ?? "",
    }));
}

const parseImage = (el: DefaultTreeAdapterMap["element"]) => {
  const src = el.attrs.find((attr) => attr.name === "src")?.value;
  return {
    node: {
      type: "IMAGE_UPLOAD_PLACEHOLDER",
      externalUrl: src || undefined,
      id: nanoid(),
    },
  };
};

const elementParserMap: {
  [tag: string]: (el: DefaultTreeAdapterMap["element"]) => Partial<Element>;
} = {
  a: (el) => ({
    type: "LINK",
    url: el.attrs.find((attr) => attr.name === "href")?.value,
  }),
  // TODO: 구현
  blockquote: () => ({ type: "PARAGRAPH" }),
  h1: () => ({ type: "HEADING", level: 1 }),
  h2: () => ({ type: "HEADING", level: 2 }),
  h3: () => ({ type: "HEADING", level: 3 }),
  h4: () => ({ type: "HEADING", level: 4 }),
  h5: () => ({ type: "HEADING", level: 5 }),
  h6: () => ({ type: "HEADING", level: 6 }),
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
};

export function parseHtml(html: string): IParseHtmlResult {
  const h = parse(html);
  h.childNodes.forEach((node) => {
    node.nodeName;
  });
}

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
  node: DefaultTreeAdapterMap["node"],
  path: number[] = []
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
    .map((child, index) => htmlToSlateFragment(child, [...path, index]))
    .flat();

  if (children.length === 0) {
    children = [{ type: "TEXT", text: "" }];
  }

  if (
    node.nodeName === "body" ||
    node.nodeName === "html" ||
    isDocument(node) ||
    isDocumentFragment(node) ||
    node.nodeName === "span" ||
    node.nodeName === "div"
  ) {
    return jsx("fragment", {}, children);
  }

  if (node.nodeName === "img") {
    const { node: attrs } = parseImage(node);
    // TODO: 이미지 업로드 관련 리스트 별도 제작
    return jsx("element", attrs, children);
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
  if (
    node.nodeName === "iframe" ||
    node.nodeName === "figcaption" ||
    node.nodeName === "figure" ||
    node.nodeName === "script" ||
    node.nodeName === "cite"
  ) {
    return null;
  }

  // eslint-disable-next-line no-console
  console.error(node);
  throw new Error(`Unknown node!: ${node.nodeName}`);
};
