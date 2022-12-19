import type { Node as SlateNode } from "slate";
import { Element } from "slate";

export async function uploadImageAfterParse5(node: SlateNode | SlateNode[]) {}

export function getPendingImagesRecursive(
  node: SlateNode,
  currentPath: number[] = []
): Map<string, { path: number[] }> {
  const result: Map<string, { path: number[] }> = new Map();

  if (node.type === "IMAGE_UPLOAD_PLACEHOLDER") {
    result.set(node.id, { path: currentPath });
  }

  if (Element.isElement(node)) {
    node.children.forEach((child, index) => {
      const childResult = getPendingImagesRecursive(child, [
        ...currentPath,
        index,
      ]);
      childResult.forEach((value, key) => {
        result.set(key, value);
      });
    });
  }

  return result;
}

export function getPendingImages(nodes: SlateNode[]) {
  const result: Map<string, { path: number[] }> = new Map();

  nodes.forEach((node, index) => {
    const childResult = getPendingImagesRecursive(node, [index]);
    childResult.forEach((value, key) => {
      childResult.set(key, value);
    });
  });

  return result;
}
