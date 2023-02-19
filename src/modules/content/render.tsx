import type { RenderElementProps, RenderLeafProps } from "slate-react";

import Blockquote from "./blockquote/Blockquote";
import Callout from "./callout/Callout";
import CodeBlock from "./code-block/CodeBlock";
import CodeElement from "./code-block/CodeElement";
import CodeLine from "./code-block/CodeLine";
import Heading from "./heading/Heading";
import Hr from "./hr/Hr";
import Image from "./image/Image";
import ImageCaption from "./image/ImageCaption";
import ImageContainer from "./image/ImageContainer";
import ImageUploadPlaceholder from "./image/ImageUploadPlaceholder";
import Link from "./link/Link";
import List from "./list/List";
import ListItem from "./list/ListItem";
import Paragraph from "./paragraph/Paragraph";
import RawHtml from "./raw-html/RawHtml";
import Table from "./table/Table";
import TableCell from "./table/TableCell";
import TableGroup from "./table/TableGroup";
import TableRow from "./table/TableRow";
import Text from "./text/Text";

// eslint-disable-next-line complexity
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
    case "IMAGE_UPLOAD_PLACEHOLDER":
      return <ImageUploadPlaceholder {...props} element={element} />;
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
    case "RAW_HTML":
      return <RawHtml {...props} element={element} />;
    case "BLOCKQUOTE":
      return <Blockquote {...props} element={element} />;
    default:
      throw new Error(`no element found: ${element.type}`);
  }
}

export function renderLeaf(props: RenderLeafProps) {
  return <Text {...props} />;
}
