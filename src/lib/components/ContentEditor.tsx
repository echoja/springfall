import { useHotkeys } from "@lib/hooks/use-hotkeys";
import { renderElement, renderLeaf } from "@lib/render";
import { useCallback, useState } from "react";
import type { Descendant } from "slate";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Editable, Slate, withReact } from "slate-react";

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

  const openCmdPalette = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("open it!");
  }, []);

  useHotkeys({
    keys: "ctrl+shift+p, cmd+shift+p",
    callback: openCmdPalette,
  });

  return (
    <Slate value={value} onChange={onChange} editor={editor}>
      <div className="relative">
        <Editable
          className="p-3 border max-w-screen-lg "
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
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
          }}
        />
      </div>
    </Slate>
  );
};
