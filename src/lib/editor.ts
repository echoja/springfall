import { Editor, Element } from "slate";

export const selectionFilteredByType = (
  editor: Editor,
  type: Element["type"]
) => {
  const { selection } = editor;
  if (!selection) return false;

  return Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    })
  );
};
