import type { Editor } from "slate";
import { Transforms } from "slate";

import type { Command } from "../types";

export const insertRawHtmlItem = {
  type: "INSERT_RAW_HTML",
  label: "HTML 삽입",
  hiddenLabel: "insert raw html",
} as const;

export const handler = (editor: Editor, _command: Command) => {
  Transforms.insertNodes(
    editor,
    {
      type: "RAW_HTML",
      children: [{ text: "", type: "TEXT" }],
      html: "",
    },
    { select: true }
  );
};
