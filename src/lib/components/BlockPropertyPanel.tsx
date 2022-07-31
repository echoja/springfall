import { editingPostContentDataAtom } from "@lib/store";
import type { ICodeBlock } from "@lib/types";
import { useAtom } from "jotai";
import { memo, useMemo } from "react";
import type { Node, Path } from "slate";
import { Transforms, Editor } from "slate";
import { useSlateSelector, useSlateStatic } from "slate-react";

import SelectGroup from "./property-panel/SelectGroup";
import SwitchGroup from "./property-panel/SwitchGroup";
import TextInputGroup from "./property-panel/TextInputGroup";

const CodeBlockPropertyPanel: React.FC<{ node: ICodeBlock; path: Path }> = memo(
  ({ node, path }) => {
    const editor = useSlateStatic();

    return (
      <>
        <SelectGroup
          className="mb-2"
          title="언어"
          value={node.lang}
          onChange={(v) => {
            Transforms.setNodes(editor, { lang: v }, { at: path });
          }}
          options={
            [
              {
                label: "TypeScript",
                value: "tsx",
              },
              {
                label: "JavaScript",
                value: "js",
              },
            ] as const
          }
        />

        <TextInputGroup
          className="mb-2"
          title="파일명"
          value={node.label ?? ""}
          onChange={(v) => {
            Transforms.setNodes(editor, { label: v }, { at: path });
          }}
        />

        <TextInputGroup
          className="mb-2"
          title="URL"
          value={node.url ?? ""}
          onChange={(v) => {
            Transforms.setNodes(editor, { url: v }, { at: path });
          }}
        />

        <SwitchGroup
          className="mb-2"
          title="복사 기능"
          checked={node.showCopy}
          onChange={(checked) => {
            Transforms.setNodes(editor, { showCopy: checked }, { at: path });
          }}
        />

        <SwitchGroup
          className="mb-2"
          title="행 번호 표시"
          checked={node.showLines}
          onChange={(checked) => {
            Transforms.setNodes(editor, { showLines: checked }, { at: path });
          }}
        />
      </>
    );
  }
);

function getPropertyPanel(node: Node, path: Path): React.ReactNode {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (node.type) {
    case "CODE_BLOCK":
      return <CodeBlockPropertyPanel node={node} path={path} />;
    default:
      return null;
  }
}

const PropertyPanel: React.FC = () => {
  const selection = useSlateSelector((editor) => editor.selection);
  const editor = useSlateStatic();

  const selectedNodePath = useMemo<Path | null>(() => {
    if (!selection) {
      return null;
    }

    const entry = Editor.node(editor, selection);

    return entry[0] === editor ? null : entry[1];
  }, [editor, selection]);

  const selectedElementPath = useMemo<Path | null>(() => {
    if (!selectedNodePath) {
      return null;
    }

    const foundResult = Editor.above(editor, {
      at: selectedNodePath,
      match: (n) => Editor.isBlock(editor, n),
    });

    if (foundResult) {
      return foundResult[1];
    }

    return null;
  }, [editor, selectedNodePath]);

  const { firstIndex, restPath } = useMemo(() => {
    if (!selectedElementPath) {
      return { firstIndex: -1, restPath: [] };
    }
    const [first, ...rest] = selectedElementPath;
    return { firstIndex: first, restPath: rest };
  }, [selectedElementPath]);

  const [editingPostContentData] = useAtom(editingPostContentDataAtom);

  const node = useMemo(() => {
    if (firstIndex === -1 || firstIndex === undefined) {
      return null;
    }
    const firstNode = editingPostContentData[firstIndex] ?? null;
    return restPath.reduce((reducingNode, index) => {
      if (!reducingNode) {
        return null;
      }

      if (!Editor.isBlock(editor, reducingNode)) {
        return null;
      }

      const child = reducingNode.children[index];
      if (!child) {
        return null;
      }

      return child;
    }, firstNode);
  }, [editingPostContentData, editor, firstIndex, restPath]);

  const propertyPanel = useMemo(
    () =>
      node && selectedElementPath
        ? getPropertyPanel(node, selectedElementPath)
        : null,
    [node, selectedElementPath]
  );

  return <div>{propertyPanel}</div>;
};

export default memo(PropertyPanel);
