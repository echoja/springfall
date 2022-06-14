import { renderElement, renderLeaf } from "@lib/render";
import type { Mark } from "@lib/types";
import type { KeyboardEvent } from "react";
import { useMemo, useCallback, useState, memo } from "react";
import { Editor, Transforms } from "slate";
import { Editable, useSlateStatic } from "slate-react";
import { twMerge } from "tailwind-merge";

// Define our own custom set of helpers.
function isMarkActive(editor: Editor, mark: Mark) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === "TEXT" && n[mark] === true,
    universal: true,
  });

  return Boolean(match);
}

const toggleMark = (editor: Editor, mark: Mark) => {
  const isActive = isMarkActive(editor, mark);

  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};

function isCodeBlockActive(editor: Editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === "CODE_BLOCK",
  });

  return Boolean(match);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toggleCodeBlock(editor: Editor) {
  const isActive = isCodeBlockActive(editor);
  Transforms.setNodes(
    editor,
    { type: isActive ? undefined : "CODE_BLOCK" },
    { match: (n) => Editor.isBlock(editor, n) }
  );
}

function onKeyDown(event: KeyboardEvent<HTMLDivElement>, editor: Editor) {
  if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
    switch (event.key) {
      case "s":
        event.preventDefault();
        toggleMark(editor, "strikethrough");
        break;

      case "k":
        event.preventDefault();
        toggleMark(editor, "kbd");
        break;

      default:
        break;
    }
    return;
  }

  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case "b":
        event.preventDefault();
        toggleMark(editor, "bold");
        break;

      case "u":
        event.preventDefault();
        toggleMark(editor, "underline");
        break;

      case "e":
        event.preventDefault();
        toggleMark(editor, "code");
        break;

      case "i":
        event.preventDefault();
        toggleMark(editor, "italic");
        break;

      default:
        break;
    }
  }
}

const ContentEditorEditable: React.FC = () => {
  const editor = useSlateStatic();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = useState(false);

  const editableOnBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const editableOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onHandleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown(event, editor);
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
      onKeyDown={onHandleKeyDown}
    />
  );
};

export default memo(ContentEditorEditable);
