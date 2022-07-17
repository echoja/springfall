import type { ICodeBlock } from "@modules/content/types";
import type { Element } from "slate";

export function getDefaultNodeProps(
  type: Element["type"]
): Omit<Partial<Element>, "type" | "children"> {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case "CODE_BLOCK": {
      const result: ICodeBlock = {
        type: "CODE_BLOCK",
        children: [],
        lang: "tsx",
        showCopy: true,
        showLines: true,
      };
      return result;
    }
    default:
      return {};
  }
}
