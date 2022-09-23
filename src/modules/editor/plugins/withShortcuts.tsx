import withListShortcuts from "@modules/content/list/with-list-shortcuts";
import type { Editor } from "slate";

export default function withShortcuts(editor: Editor) {
  withListShortcuts(editor);
  return editor;
}
