import Callout from "@modules/content/callout/Callout";
import CodeBlock from "@modules/content/code-block/CodeBlock";
import CodeElement from "@modules/content/code-block/CodeElement";
import CodeLine from "@modules/content/code-block/CodeLine";
import Heading from "@modules/content/heading/Heading";
import Hr from "@modules/content/hr/Hr";
import Image from "@modules/content/image/Image";
import ImageCaption from "@modules/content/image/ImageCaption";
import ImageContainer from "@modules/content/image/ImageContainer";
import Link from "@modules/content/link/Link";
import List from "@modules/content/list/List";
import Paragraph from "@modules/content/paragraph/Paragraph";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { SetOptional } from "type-fest";

import { Leaf, PublicLeaf } from "./Leaf";
import ListItem from "./list/ListItem";
import Table from "./table/Table";
import TableCell from "./table/TableCell";
import TableGroup from "./table/TableGroup";
import TableRow from "./table/TableRow";

export function renderElement(props: RenderElementProps) {
  const { element } = props;
  switch (element.type) {
    case "CODE_BLOCK":
      return <CodeBlock {...props} element={element} />;
    case "CODE_ELEMENT":
      return <CodeElement {...props} element={element} />;
    case "CODE_LINE":
      return <CodeLine {...props} element={element} />;
    case "PARAGRAPH":
      return <Paragraph {...props} element={element} />;
    case "HEADING":
      return <Heading {...props} element={element} />;
    case "LIST":
      return <List {...props} element={element} />;
    case "LIST_ITEM":
      return <ListItem {...props} element={element} />;
    case "CALLOUT":
      return <Callout {...props} element={element} />;
    case "HR":
      return <Hr {...props} element={element} />;
    case "IMAGE":
      return <Image {...props} element={element} />;
    case "IMAGE_CONTAINER":
      return <ImageContainer {...props} element={element} />;
    case "IMAGE_CAPTION":
      return <ImageCaption {...props} element={element} />;
    case "LINK":
      return <Link {...props} element={element} />;
    case "TABLE":
      return <Table {...props} element={element} />;
    case "TABLE_GROUP":
      return <TableGroup {...props} element={element} />;
    case "TABLE_ROW":
      return <TableRow {...props} element={element} />;
    case "TABLE_CELL":
      return <TableCell {...props} element={element} />;
    default:
      throw new Error(`no element found: ${element.type}`);
  }
}

export function renderPublicLeaf(
  props: SetOptional<RenderLeafProps, "attributes">
) {
  return <PublicLeaf {...props} />;
}

export function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}
