import React from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import SwitchGroup from "@modules/admin-ui/components/SwitchGroup";
import type { IList } from "@modules/content/types";

const ListPropertyPanel: React.FC<{ node: IList; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <SwitchGroup
      checked={node.ordered}
      title="순서"
      onChange={(ordered) => {
        Transforms.setNodes(editor, { ordered }, { at: path });
      }}
    />
  );
};

export default React.memo(ListPropertyPanel);
