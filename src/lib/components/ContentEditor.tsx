// import {
//   useFloating,
//   useInteractions,
//   useClick,
//   shift,
// } from "@floating-ui/react-dom-interactions";
// import useOutsideClick from "@lib/hooks/use-outside-click";
import { renderElement, renderLeaf } from "@lib/render";
import type { ElementNode } from "@lib/types";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type { Descendant } from "slate";
import { createEditor, Editor, Transforms, Text } from "slate";
import { ReactEditor, Editable, Slate, withReact } from "slate-react";

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
  // const [contextMenuAnchorPoint, setContextMenuAnchorPoint] = useState<{
  //   x: number;
  //   y: number;
  // }>({ x: 0, y: 0 });
  // const [contextMenuVisible, setContextMenuVisible] = useState(false);
  // const [contextMenuPath, setContextMenuPath] = useState<Location | null>(null);

  // const closeContextMenu = useCallback(() => {
  //   setContextMenuVisible(false);
  // }, [setContextMenuVisible]);

  // const { setDom: setContextMenu } = useOutsideClick(closeContextMenu);

  // const { x, y, reference, floating, strategy, context } = useFloating({
  //   placement: "right",
  //   middleware: [shift()],
  // });

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const resultEntry = Editor.above<ElementNode>(editor, {
        at: ReactEditor.findEventRange(editor, event),
        match: (n) => Editor.isBlock(editor, n),
      });
      if (resultEntry) {
        // setContextMenuAnchorPoint({ x: event.clientX, y: event.clientY });
        // setContextMenuVisible(true);
        // setContextMenuPath(resultEntry[1]);
      }
    },
    [editor]
  );

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.table(contextMenuAnchorPoint);
  // }, [contextMenuAnchorPoint]);

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
          onContextMenu={handleContextMenu}
        />
        {/* <div
          ref={(el) => {
            setContextMenu(el);
            floating(el);
          }}
          className="shadow-xl bg-white"
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (contextMenuPath) {
                Transforms.setNodes<ElementNode>(
                  editor,
                  {
                    type: "CODE_BLOCK",
                  },
                  {
                    at: contextMenuPath,
                  }
                );
              }
            }}
          >
            코드블록으로 전환
          </button>
          <button
            type="button"
            onClick={() => {
              if (contextMenuPath) {
                Transforms.setNodes<ElementNode>(
                  editor,
                  {
                    type: "PARAGRAPH",
                  },
                  {
                    at: contextMenuPath,
                  }
                );
              }
            }}
          >
            문단으로 전환
          </button>
        </div> */}
      </div>
    </Slate>
  );
};
