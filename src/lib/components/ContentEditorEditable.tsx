import { renderElement, renderLeaf } from "@lib/render";
import type { KeyboardEvent } from "react";
import { useMemo, useCallback, useState, memo } from "react";
import { Editor, Transforms, Text } from "slate";
import { Editable, useSlate } from "slate-react";
import { twMerge } from "tailwind-merge";

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "TEXT" && n.bold === true,
      universal: true,
    });

    return Boolean(match);
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "CODE_BLOCK",
    });

    return Boolean(match);
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "CODE_BLOCK" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const ContentEditorEditable = () => {
  const editor = useSlate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = useState(false);

  const editableOnBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const editableOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!event.ctrlKey) {
        return;
      }

      switch (event.key) {
        case "`":
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
          break;

        case "b":
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
          break;

        default:
          break;
      }
    },
    [editor]
  );

  const className = useMemo(() => twMerge("p-3 min-h-[80vh]"), []);

  return (
    <Editable
      className={className}
      placeholder="내용을 입력하세요"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onBlur={editableOnBlur}
      onFocus={editableOnFocus}
      onKeyDown={onKeyDown}
    />
  );
};

export default memo(ContentEditorEditable);
