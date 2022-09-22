import type {
  ICodeBlock,
  ICodeLine,
  ICodeElement,
  IText,
} from "@modules/content/types";

export default function codeNodeToString(
  node: ICodeBlock | ICodeLine | ICodeElement | IText
): string {
  if (node.type === "CODE_BLOCK") {
    return node.children.map(codeNodeToString).join("\n");
  }

  if (node.type === "CODE_LINE" || node.type === "CODE_ELEMENT") {
    return node.children.map(codeNodeToString).join("");
  }

  if (node.type === "TEXT") {
    return node.text;
  }
  return "";
}
