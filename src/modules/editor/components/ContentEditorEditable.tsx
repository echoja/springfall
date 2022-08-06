import { renderElement, renderLeaf } from "@modules/content/render";
import type { Mark } from "@modules/content/types";
import { isKeyHotkey } from "is-hotkey";
import type { KeyboardEvent } from "react";
import { useMemo, useCallback, useState, memo } from "react";
import { Editor, Transforms, Range } from "slate";
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
    switch (event.code) {
      case "KeyS":
        event.preventDefault();
        toggleMark(editor, "strikethrough");
        break;

      case "KeyK":
        event.preventDefault();
        toggleMark(editor, "kbd");
        break;

      default:
        break;
    }
    return;
  }

  if (event.ctrlKey || event.metaKey) {
    switch (event.code) {
      case "KeyB":
        event.preventDefault();
        toggleMark(editor, "bold");
        break;

      case "KeyU":
        event.preventDefault();
        toggleMark(editor, "underline");
        break;

      case "KeyE":
        event.preventDefault();
        toggleMark(editor, "code");
        break;

      case "KeyI":
        event.preventDefault();
        toggleMark(editor, "italic");
        break;

      default:
        break;
    }
  }

  const { selection } = editor;

  // Default left/right behavior is unit:'character'.
  // This fails to distinguish between two cursor positions, such as
  // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
  // Here we modify the behavior to unit:'offset'.
  // This lets the user step into and out of the inline without stepping over characters.
  // You may wish to customize this further to only use unit:'offset' in specific cases.
  if (selection && Range.isCollapsed(selection)) {
    if (isKeyHotkey("left", event)) {
      event.preventDefault();
      Transforms.move(editor, { unit: "offset", reverse: true });
      return;
    }
    if (isKeyHotkey("right", event)) {
      event.preventDefault();
      Transforms.move(editor, { unit: "offset" });
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
