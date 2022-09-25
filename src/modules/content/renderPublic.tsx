import type { ReactElement } from "react";
import type { Descendant, Element } from "slate";

import PublicCallout from "./callout/PublicCallout";
import PublicCodeBlock from "./code-block/PublicCodeBlock";
import PublicCodeBlockElement from "./code-block/PublicCodeElement";
import PublicCodeLine from "./code-block/PublicCodeLine";
import PublicHeading from "./heading/PublicHeading";
import PublicHr from "./hr/PublicHr";
import PublicImage from "./image/PublicImage";
import PublicImageCaption from "./image/PublicImageCaption";
import PublicImageContainer from "./image/PublicImageContainer";
import { PublicLeaf } from "./Leaf";
import PublicLink from "./link/PublicLink";
import PublicList from "./list/PublicList";
import PublicListItem from "./list/PublicListItem";
import PublicParagraph from "./paragraph/PublicParagraph";
import PublicTable from "./table/PublicTable";
import PublicTableCell from "./table/PublicTableCell";
import PublicTableGroup from "./table/PublicTableGroup";
import PublicTableRow from "./table/PublicTableRow";
import type { IText, RenderPublicElementProps } from "./types";

export function renderPublicElement(props: RenderPublicElementProps) {
  const { element } = props;
  switch (element.type) {
    case "CODE_BLOCK":
      return <PublicCodeBlock {...props} element={element} />;
    case "CODE_ELEMENT":
      return <PublicCodeBlockElement {...props} element={element} />;
    case "CODE_LINE":
      return <PublicCodeLine {...props} element={element} />;
    case "PARAGRAPH":
      return <PublicParagraph {...props} element={element} />;
    case "HEADING":
      return <PublicHeading {...props} element={element} />;
    case "LIST":
      return <PublicList {...props} element={element} />;
    case "LIST_ITEM":
      return <PublicListItem {...props} element={element} />;
    case "CALLOUT":
      return <PublicCallout {...props} element={element} />;
    case "HR":
      return <PublicHr {...props} element={element} />;
    case "IMAGE":
      return <PublicImage {...props} element={element} />;
    case "IMAGE_CAPTION":
      return <PublicImageCaption {...props} element={element} />;
    case "IMAGE_CONTAINER":
      return <PublicImageContainer {...props} element={element} />;
    case "LINK":
      return <PublicLink {...props} element={element} />;
    case "TABLE":
      return <PublicTable {...props} element={element} />;
    case "TABLE_GROUP":
      return <PublicTableGroup {...props} element={element} />;
    case "TABLE_ROW":
      return <PublicTableRow {...props} element={element} />;
    case "TABLE_CELL":
      return <PublicTableCell {...props} element={element} />;
    default:
      return null;
  }
}
export const PublicElement = renderPublicElement;

// any를 한 데 모으기 위함
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export function renderPublic(
  data: Descendant[]
): ReactElement<Any, Any> | null {
  return (
    <>
      {data.map((child, index) => {
        if ((child as { children?: Any }).children) {
          // render element
          let children;
          if ((child as { children?: Any }).children) {
            children = renderPublic((child as { children?: Any }).children);
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <PublicElement key={index} element={child as Element}>
              {children}
            </PublicElement>
          );
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <PublicLeaf key={index} leaf={child as IText} text={child as IText}>
            {(child as Any).text}
          </PublicLeaf>
        );
      })}
    </>
  );
}
