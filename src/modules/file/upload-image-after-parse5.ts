import type { Node as SlateNode } from "slate";
import { Element } from "slate";

export async function uploadImageAfterParse5(node: SlateNode | SlateNode[]) {}

export type PendingImages = Map<string, { path: number[]; src: string }>;

export function getPendingImagesRecursive(
  node: SlateNode,
  currentPath: number[] = []
): PendingImages {
  const result: PendingImages = new Map();

  if (node.type === "IMAGE_UPLOAD_PLACEHOLDER" && node.src) {
    result.set(node.id, { path: currentPath, src: node.src });
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
  const result: PendingImages = new Map();

  nodes.forEach((node, index) => {
    const childResult = getPendingImagesRecursive(node, [index]);
    childResult.forEach((value, key) => {
      result.set(key, value);
    });
  });

  return result;
}
