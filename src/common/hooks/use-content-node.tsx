import { editingPostContentDataAtom } from "@common/store";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";
import type { Node } from "slate";
import { Editor } from "slate";
import { useSlateStatic } from "slate-react";

export default function useContentNode(path: number[]) {
  const editor = useSlateStatic();
  const [atom] = useAtom(
    useMemo(
      () =>
        selectAtom(editingPostContentDataAtom, (v) => {
          const reduced: Node = {
            type: "EDITOR",
            children: v,
          } as Editor;

          return path.reduce<Node>((acc, currentPath) => {
            if (Editor.isBlock(editor, acc) || acc.type === "EDITOR") {
              const next = acc.children[currentPath];
              if (next) {
                return next;
              }
              throw new Error("Invalid Path");
            }
            throw new Error("Invalid Path");
          }, reduced);
        }),
      [editor, path]
    )
  );

  return atom;
}
