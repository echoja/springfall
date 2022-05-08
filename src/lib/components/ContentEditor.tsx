import { useHotkeys } from "@lib/hooks/use-hotkeys";
import type { Command } from "@lib/types";
import { useEffect, useCallback, useState } from "react";
import type { Descendant, Editor } from "slate";
import { createEditor, Transforms } from "slate";
import { Slate, withReact, ReactEditor } from "slate-react";

import CommandPalette from "./CommandPalette";
import ContentEditorEditable from "./ContentEditorEditable";

// Define a React component to render leaves with bold text.

export function insertSomeWords(editor: Editor) {
  Transforms.insertText(editor, "some words", {
    at: {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 3 },
    },
  });
}

export function insertSomeWords2(editor: Editor) {
  Transforms.insertText(editor, "some words", {
    at: {
      path: [0, 0],
      offset: 0,
    },
  });
}

export type IContentEditorProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

export const ContentEditor: React.FC<IContentEditorProps> = ({
  onChange,
  value,
}) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [openCmdPalette, setOpenCmdPalette] = useState(false);

  const cmdPaletteShortcutHandler = useCallback(() => {
    // eslint-disable-next-line no-console
    setOpenCmdPalette(true);
  }, []);

  useHotkeys({
    keys: "ctrl+shift+p, cmd+shift+p",
    callback: cmdPaletteShortcutHandler,
  });

  const onCommand = useCallback((_command: Command) => {}, []);

  useEffect(() => {
    if (openCmdPalette) {
      ReactEditor.blur(editor);
    }
  }, [editor, openCmdPalette]);

  return (
    <Slate value={value} onChange={onChange} editor={editor}>
      <CommandPalette
        open={openCmdPalette}
        setOpen={setOpenCmdPalette}
        onCommand={onCommand}
      />
      <div className="relative">
        <ContentEditorEditable />
      </div>
    </Slate>
  );
};
