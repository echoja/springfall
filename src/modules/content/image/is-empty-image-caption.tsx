import type { IImageCaption } from "@modules/content/types";

const isEmptyImageCaption = (node: IImageCaption) => {
  const child = node.children[0];
  return Boolean(child && child.type === "TEXT" && child.text === "");
};

export default isEmptyImageCaption;
