import type { Editor } from "slate";

import type { ElementNode } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const withImage = (editor: Editor) => {
  const { isVoid } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = (element: ElementNode) => {
    return element.type === "IMAGE" || isVoid(element);
  };
};
