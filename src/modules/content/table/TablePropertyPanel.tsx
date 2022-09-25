import SwitchGroup from "@modules/admin-ui/components/SwitchGroup";
import type { ITable } from "@modules/content/types";
import React from "react";
import type { Path } from "slate";
import { Node, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

const TablePropertyPanel: React.FC<{ node: ITable; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <SwitchGroup
      checked={node.header ?? false}
      title="Header 행"
      onChange={(header) => {
        const [thead] = [...Node.descendants(node)].filter(([descendant]) => {
          return (
            descendant.type === "TABLE_GROUP" && descendant.role === "head"
          );
        });

        const [tbody] = [...Node.descendants(node)].filter(([descendant]) => {
          return (
            descendant.type === "TABLE_GROUP" && descendant.role === "body"
          );
        });

        if ((!thead && !header) || (thead && header)) {
          Transforms.setNodes(editor, { header }, { at: path });
          return;
        }

        // turn on header
        if (header && tbody) {
          Transforms.insertNodes(
            editor,
            { type: "TABLE_GROUP", role: "head", children: [] },
            { at: [...path, 0] }
          );
          Transforms.moveNodes(editor, {
            at: [...path, 1, 0],
            to: [...path, 0, 0],
          });
          Transforms.setNodes(
            editor,
            { header },
            {
              mode: "all",
              at: [...path, 0, 0],
              match(n) {
                return n.type === "TABLE_CELL";
              },
            }
          );
          Transforms.setNodes(editor, { header }, { at: path });
          return;
        }

        // turn off header
        if (!header && thead && tbody) {
          Transforms.setNodes(
            editor,
            { header },
            {
              at: [...path, 0],
              match(n) {
                return n.type === "TABLE_CELL";
              },
            }
          );
          Transforms.moveNodes(editor, {
            at: [...path, ...thead[1], 0],
            to: [...path, ...tbody[1], 0],
          });
          Transforms.removeNodes(editor, { at: [...path, ...thead[1]] });
          Transforms.setNodes(editor, { header }, { at: path });
        }
      }}
    />
  );
};

export default React.memo(TablePropertyPanel);
