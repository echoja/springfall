import { editingPostContentDataAtom } from "@common/store";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";
import type { Node, Editor, Descendant } from "slate";

export default function useContentNode(path: number[]) {
  const [atom] = useAtom(
    useMemo(
      () =>
        selectAtom(editingPostContentDataAtom, (v) => {
          const reduced: Node = {
            type: "EDITOR",
            children: v,
          } as Editor;

          const result = path.reduce<Node | undefined>((acc, currentPath) => {
            return (acc as { children: Descendant[] })?.children?.[currentPath];
          }, reduced);

          if (!result) {
            throw new Error(`Path invalid: ${JSON.stringify(path)}`);
          }

          return result;
        }),
      [path]
    )
  );

  return atom;
}
