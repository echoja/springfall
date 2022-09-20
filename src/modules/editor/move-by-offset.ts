import isHotkey from "is-hotkey";
import type { KeyboardEvent } from "react";
import type { Editor } from "slate";
import { Transforms, Range } from "slate";

export default function moveByOffset(
  event: KeyboardEvent<HTMLDivElement>,
  editor: Editor
) {
  const { selection } = editor;

  // Default left/right behavior is unit:'character'.
  // This fails to distinguish between two cursor positions, such as
  // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
  // Here we modify the behavior to unit:'offset'.
  // This lets the user step into and out of the inline without stepping over characters.
  // You may wish to customize this further to only use unit:'offset' in specific cases.
  if (selection && Range.isCollapsed(selection)) {
    if (isHotkey("left", event)) {
      event.preventDefault();
      Transforms.move(editor, { unit: "offset", reverse: true });
      return;
    }

    if (isHotkey("right", event)) {
      event.preventDefault();
      Transforms.move(editor, { unit: "offset" });
    }
  }
}
