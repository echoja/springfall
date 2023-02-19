import type { Editor } from "slate";

import withListShortcuts from "@modules/content/list/with-list-shortcuts";

export default function withShortcuts(editor: Editor) {
  withListShortcuts(editor);
  return editor;
}
