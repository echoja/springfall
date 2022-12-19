import type { DefaultTreeAdapterMap } from "parse5";

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
