import type { Editor } from "slate";

// eslint-disable-next-line import/prefer-default-export
export const withRawHtml = (editor: Editor) => {
  const { isVoid } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = (element) => {
    return element.type === "RAW_HTML" || isVoid(element);
  };
};
