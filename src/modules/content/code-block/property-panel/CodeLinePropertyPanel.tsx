import type React from "react";
import { memo } from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import SelectGroup from "@modules/admin-ui/components/SelectGroup";
import type { ICodeLine } from "@modules/content/types";

const CodeLinePropertyPanel: React.FC<{ node: ICodeLine; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <SelectGroup
      className="mb-2"
      title="라인 형식"
      value={node.format}
      onChange={(v) => {
        if (!v) {
          Transforms.unsetNodes(editor, "format", { at: path });
        } else {
          Transforms.setNodes(editor, { format: v }, { at: path });
        }
      }}
      options={
        [
          {
            label: "없음",
            value: undefined,
          },
          {
            label: "Info",
            value: "info",
          },
          {
            label: "Added",
            value: "added",
          },
          {
            label: "Deleted",
            value: "deleted",
          },
        ] as const
      }
    />
  );
};

export default memo(CodeLinePropertyPanel);
