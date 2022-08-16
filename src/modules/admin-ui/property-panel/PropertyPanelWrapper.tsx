import { deepclone } from "@common/util";
import { memo, useMemo } from "react";
import type { Path } from "slate";
import { Editor } from "slate";
import { useSlate, useSlateSelector } from "slate-react";

import PropertyPanel from "./PropertyPanel";

const PropertyPanelWrapper: React.FC = () => {
  const selection = useSlateSelector((editor) => editor.selection);
  const editor = useSlate();

  const selectedNodePath = useMemo<Path | null>(() => {
    if (!selection) {
      return null;
    }

    const entry = Editor.node(editor, selection);

    return entry[0] === editor ? null : entry[1];
  }, [editor, selection]);

  const selectedNodeTree = useMemo(() => {
    const accPath: number[] = [];
    const result: Path[] = [];
    selectedNodePath?.forEach((nodePath) => {
      accPath.push(nodePath);

      const [node] = Editor.node(editor, accPath);
      if (node) {
        result.push(deepclone(accPath));
      }
    });
    return result;
  }, [editor, selectedNodePath]);

  const propertyPanels = useMemo(
    () =>
      selectedNodeTree.map((nodePath, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <PropertyPanel key={index} nodePath={nodePath} />
        );
      }),
    [selectedNodeTree]
  );

  return <div>{propertyPanels}</div>;
};

export default memo(PropertyPanelWrapper);
