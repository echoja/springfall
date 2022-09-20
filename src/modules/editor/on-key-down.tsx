import type { KeyboardEvent } from "react";
import type { Editor } from "slate";

import { formatByHotkey } from "./hotkeys/format";
import moveElement from "./hotkeys/move-element";
import moveByOffset from "./move-by-offset";

export default function onKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  editor: Editor
) {
  formatByHotkey(event, editor);
  moveByOffset(event, editor);
  moveElement(event, editor);
}
