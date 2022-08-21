import type { Editor } from "slate";
import { Transforms } from "slate";

import type { ElementNode } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const withImage = (editor: Editor) => {
  const { isVoid, normalizeNode } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = (element: ElementNode) => {
    return element.type === "IMAGE" || isVoid(element);
  };

  // eslint-disable-next-line no-param-reassign
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (node.type === "IMAGE_CONTAINER") {
      const children = node.children as ElementNode[];
      if (children.length === 1) {
        Transforms.unwrapNodes(editor, { at: path.concat(0) });
        Transforms.setNodes(editor, { type: "PARAGRAPH" }, { at: path });
      }
      if (children.length === 3) {
        Transforms.removeNodes(editor, { at: path.concat(2) });
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};
