import type { ReactElement } from "react";
import type { Descendant, Element } from "slate";

import PublicCallout from "./callout/PublicCallout";
import PublicCodeBlock from "./code-block/PublicCodeBlock";
import PublicCodeBlockElement from "./code-block/PublicCodeElement";
import PublicCodeLine from "./code-block/PublicCodeLine";
import PublicHeading from "./heading/PublicHeading";
import PublicHr from "./hr/PublicHr";
import PublicImage from "./image/PublicImage";
import { PublicLeaf } from "./Leaf";
import PublicLink from "./link/PublicLink";
import PublicList from "./list/PublicList";
import Paragraph from "./paragraph/Paragraph";
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
      return <Paragraph {...props} element={element} />;
    case "HEADING":
      return <PublicHeading {...props} element={element} />;
    case "LIST":
      return <PublicList {...props} element={element} />;
    case "CALLOUT":
      return <PublicCallout {...props} element={element} />;
    case "HR":
      return <PublicHr {...props} element={element} />;
    case "IMAGE":
      return <PublicImage {...props} element={element} />;
    case "LINK":
      return <PublicLink {...props} element={element} />;
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
      {data.map((descendant, index) => {
        if (
          descendant.type === "ICON" ||
          descendant.type === "TEXT" ||
          descendant.type === "NOOP"
        ) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <PublicLeaf key={index} leaf={descendant} text={descendant}>
              {(descendant as Any).text}
            </PublicLeaf>
          );
        }

        // render element
        let children;
        if ((descendant as { children?: Any }).children) {
          children = renderPublic((descendant as { children?: Any }).children);
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <PublicElement key={index} element={descendant}>
            {children}
          </PublicElement>
        );
      })}
    </>
  );
}
