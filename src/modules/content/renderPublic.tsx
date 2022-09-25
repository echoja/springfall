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
import PublicLink from "./link/PublicLink";
import PublicList from "./list/PublicList";
import PublicListItem from "./list/PublicListItem";
import PublicParagraph from "./paragraph/PublicParagraph";
import PublicTable from "./table/PublicTable";
import PublicTableCell from "./table/PublicTableCell";
import PublicTableGroup from "./table/PublicTableGroup";
import PublicTableRow from "./table/PublicTableRow";
import PublicText from "./text/PublicText";
import type { IText, CommonRenderElementProps } from "./types";

export function renderPublicElement(props: CommonRenderElementProps) {
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
        const typedChild = child as { children?: Any };

        if (typedChild.children) {
          // render element
          const children = renderPublic(typedChild.children);

          const empty =
            typedChild.children?.length === 1 &&
            typedChild.children?.[0]?.text === "";

          return (
            // eslint-disable-next-line react/no-array-index-key
            <PublicElement key={index} element={child as Element} empty={empty}>
              {children}
            </PublicElement>
          );
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <PublicText key={index} leaf={child as IText} text={child as IText}>
            {(child as Any).text}
          </PublicText>
        );
      })}
    </>
  );
}
