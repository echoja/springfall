import type { Mark } from "@modules/content/types";
import isHotkey from "is-hotkey";
import type { KeyboardEvent } from "react";
import { Editor } from "slate";

// Define our own custom set of helpers.
function isMarkActive(editor: Editor, mark: Mark) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === "TEXT" && n[mark] === true,
    universal: true,
  });

  return Boolean(match);
}

export const toggleMark = (editor: Editor, mark: Mark) => {
  const isActive = isMarkActive(editor, mark);

  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};

export function formatByHotkey(
  event: KeyboardEvent<HTMLDivElement>,
  editor: Editor
) {
  if (isHotkey("mod+shift+s", event)) {
    event.preventDefault();
    toggleMark(editor, "strikethrough");
    return;
  }

  if (isHotkey("mod+shift+k", event)) {
    event.preventDefault();
    toggleMark(editor, "kbd");
    return;
  }

  if (isHotkey("mod+b", event)) {
    event.preventDefault();
    toggleMark(editor, "bold");
    return;
  }

  if (isHotkey("mod+i", event)) {
    event.preventDefault();
    toggleMark(editor, "italic");
    return;
  }

  if (isHotkey("mod+u", event)) {
    event.preventDefault();
    toggleMark(editor, "underline");
    return;
  }

  if (isHotkey("mod+e", event)) {
    event.preventDefault();
    toggleMark(editor, "code");
  }
}
