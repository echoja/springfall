import type React from "react";
import { isValidElement } from "react";

/** @see https://github.com/sunknudsen/react-node-to-string */
const reactNodeToString = (reactNode: React.ReactNode): string => {
  let string = "";
  if (typeof reactNode === "string") {
    string = reactNode;
  } else if (typeof reactNode === "number") {
    string = reactNode.toString();
  } else if (reactNode instanceof Array) {
    reactNode.forEach((child) => {
      string += reactNodeToString(child);
    });
  } else if (isValidElement(reactNode)) {
    string += reactNodeToString(reactNode.props.children);
  }
  return string;
};

export default reactNodeToString;
