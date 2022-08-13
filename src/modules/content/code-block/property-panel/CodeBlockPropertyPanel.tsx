import SelectGroup from "@modules/admin-ui/components/SelectGroup";
import SwitchGroup from "@modules/admin-ui/components/SwitchGroup";
import TextInputGroup from "@modules/admin-ui/components/TextInputGroup";
import type { ICodeBlock } from "@modules/content/types";
import React from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

const CodeBlockPropertyPanel: React.FC<{ node: ICodeBlock; path: Path }> = ({
  node,
  path,
}) => {
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
};

export default React.memo(CodeBlockPropertyPanel);
