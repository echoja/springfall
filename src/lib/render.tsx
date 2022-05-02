import type { RenderElementProps, RenderLeafProps } from "slate-react";

import Callout from "./components/elements/Callout";
import CodeBlock from "./components/elements/CodeBlock";
import Heading from "./components/elements/Heading";
import Hr from "./components/elements/Hr";
import List from "./components/elements/List";
import Paragraph from "./components/elements/Paragraph";
import Table from "./components/elements/Table";
import Youtube from "./components/elements/Youtube";
import Leaf from "./components/Leaf";

export function renderElement(props: RenderElementProps) {
  const { element } = props;
  switch (element.type) {
    case "CODE_BLOCK":
      return <CodeBlock {...props} element={element} />;
    case "PARAGRAPH":
      return <Paragraph {...props} element={element} />;
    case "HEADING":
      return <Heading {...props} element={element} />;
    case "LIST":
      return <List {...props} element={element} />;
    case "CALLOUT":
      return <Callout {...props} element={element} />;
    case "TABLE":
      return <Table {...props} element={element} />;
    case "HR":
      return <Hr {...props} element={element} />;
    case "YOUTUBE":
      return <Youtube {...props} element={element} />;
    default:
      return <Paragraph {...props} element={element} />;
  }
}

export function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}
