import React from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import TextareaGroup from "@modules/admin-ui/components/TextareaGroup";
import type { IRawHtml } from "@modules/content/types";

const RawHtmlPropertyPanel: React.FC<{ node: IRawHtml; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <TextareaGroup
      value={node.html}
      title="순서"
      onChange={(html) => {
        Transforms.setNodes(editor, { html }, { at: path });
      }}
    />
  );
};

export default React.memo(RawHtmlPropertyPanel);
