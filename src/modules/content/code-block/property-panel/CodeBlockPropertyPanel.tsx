import { deepclone } from "@common/util";
import SelectGroup from "@modules/admin-ui/components/SelectGroup";
import SwitchGroup from "@modules/admin-ui/components/SwitchGroup";
import TextInputGroup from "@modules/admin-ui/components/TextInputGroup";
import type { ICodeBlock, Language } from "@modules/content/types";
import React from "react";
import type { Path } from "slate";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { convert } from "../convert";

const CodeBlockPropertyPanel: React.FC<{ node: ICodeBlock; path: Path }> = ({
  node,
  path,
}) => {
  const editor = useSlateStatic();

  return (
    <>
      <SelectGroup<Language>
        className="mb-2"
        title="언어"
        value={node.lang}
        onChange={(lang) => {
          const converted = convert(node, lang);
          const copiedPath = deepclone(path);
          Transforms.removeNodes(editor, { at: copiedPath });
          Transforms.insertNodes(editor, converted, { at: copiedPath });
          Transforms.select(editor, copiedPath);
        }}
        options={
          [
            {
              label: "일반 텍스트",
              value: "plaintext",
            },
            {
              label: "TypeScript (tsx)",
              value: "tsx",
            },
            {
              label: "쉘 (bash)",
              value: "sh",
            },
            {
              label: "HTML",
              value: "html",
            },
            {
              label: "Rust",
              value: "rust",
            },
            {
              label: "Python",
              value: "python",
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
