import React from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import TextareaGroup from "@modules/admin-ui/components/TextareaGroup";
import type { IImage } from "@modules/content/types";

const ImagePropertyPanel: React.FC<{ node: IImage; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <TextareaGroup
      value={node.alt ?? ""}
      onChange={(value) =>
        Transforms.setNodes(editor, { alt: value }, { at: path })
      }
      title="대체 텍스트"
    />
  );
};

export default React.memo(ImagePropertyPanel);
