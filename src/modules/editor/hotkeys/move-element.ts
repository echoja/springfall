import isHotkey from "is-hotkey";
import type { KeyboardEvent } from "react";
import { Editor, Element, Transforms } from "slate";

// move element up/down with opt+up/down
const moveElement = (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {
  const { selection } = editor;

  const selectionBlockEntry = Editor.above(editor, {
    at: selection || undefined,
    match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
  });

  if (!selectionBlockEntry) {
    return;
  }

  const [_node, selectionBlockPath] = selectionBlockEntry;

  // TODO: 노드 종류에 따라 다른 방식으로 이동할 수 있도록 수정.
  // _node.type ??
  if (isHotkey("opt+up", event)) {
    event.preventDefault();
    const to = [...selectionBlockPath];
    let prevPos = to.pop();
    if (typeof prevPos === "undefined") {
      return;
    }
    prevPos -= 1;
    if (prevPos < 0) {
      return;
    }
    to.push(prevPos);

    Transforms.moveNodes(editor, { at: selectionBlockPath, to });
    return;
  }

  if (isHotkey("opt+down", event)) {
    event.preventDefault();
    const to = [...selectionBlockPath];
    let nextPos = to.pop();
    if (typeof nextPos === "undefined") {
      return;
    }
    nextPos += 1;
    to.push(nextPos);
    // TODO: Check boundary

    Transforms.moveNodes(editor, { at: selectionBlockPath, to });
  }
};

export default moveElement;
