import { Editor, Transforms, Element, Range, Point } from "slate";

import type { IList } from "../types";

/**
 * @see https://github.com/ianstormtaylor/slate/blob/main/site/examples/markdown-shortcuts.tsx
 */
const withListShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText, insertBreak } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);

      if (beforeText.length === 1 && "*-+".includes(beforeText)) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        const newProperties: Partial<Element> = {
          type: "LIST_ITEM",
        };

        Transforms.setNodes<Element>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        const list: IList = {
          type: "LIST",
          ordered: false,
          children: [],
        };

        Transforms.wrapNodes(editor, list, {
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            n.type === "LIST_ITEM",
        });

        return;
      }
    }

    insertText(text);
  };

  // eslint-disable-next-line no-param-reassign
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== "PARAGRAPH" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<Element> = {
            type: "PARAGRAPH",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "LIST_ITEM") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === "LIST",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  // eslint-disable-next-line no-param-reassign
  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      if (match) {
        const [block] = match;
        if (block.type === "LIST_ITEM" && Editor.isEmpty(editor, block)) {
          Transforms.setNodes(editor, {
            type: "PARAGRAPH",
          });
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) && Element.isElement(n) && n.type === "LIST",
            split: true,
          });
          return;
        }
      }
    }
    insertBreak();
  };

  return editor;
};

export default withListShortcuts;
