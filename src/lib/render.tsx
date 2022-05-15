import type { ReactElement } from "react";
import type { Descendant } from "slate";
import { Text } from "slate";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { SetOptional } from "type-fest";

import { PublicCallout } from "./components/elements/Callout";
import { PublicCodeBlock } from "./components/elements/CodeBlock";
import { PublicCodeBlockElement } from "./components/elements/CodeBlockElement";
import { PublicHeading } from "./components/elements/Heading";
import { PublicHr } from "./components/elements/Hr";
import { PublicImage } from "./components/elements/Image";
import { PublicList } from "./components/elements/List";
import { PublicParagraph } from "./components/elements/Paragraph";
import { PublicTable } from "./components/elements/Table";
import { PublicYoutube } from "./components/elements/Youtube";
import Leaf, { PublicLeaf } from "./components/Leaf";
import type { RenderPublicElementProps } from "./types";

export function renderPublicElement(props: RenderPublicElementProps) {
  const { element } = props;
  switch (element.type) {
    case "CODE_BLOCK":
      return <PublicCodeBlock {...props} element={element} />;
    case "CODE_BLOCK_ELEMENT":
      return <PublicCodeBlockElement {...props} element={element} />;
    case "IMAGE_CAPTION":
    case "PARAGRAPH":
      return <PublicParagraph {...props} element={element} />;
    case "HEADING":
      return <PublicHeading {...props} element={element} />;
    case "LIST":
      return <PublicList {...props} element={element} />;
    case "CALLOUT":
      return <PublicCallout {...props} element={element} />;
    case "TABLE":
      return <PublicTable {...props} element={element} />;
    case "HR":
      return <PublicHr {...props} element={element} />;
    case "YOUTUBE":
      return <PublicYoutube {...props} element={element} />;
    case "IMAGE":
      return <PublicImage {...props} element={element} />;
    default:
      return <PublicParagraph {...props} element={element} />;
  }
}

export function renderElement(props: RenderElementProps) {
  return renderPublicElement(props);
}

export function renderPublicLeaf(
  props: SetOptional<RenderLeafProps, "attributes" | "text">
) {
  return <PublicLeaf {...props} />;
}

export function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}

export const PublicElement = renderPublicElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;
export function renderPublic(
  data: Descendant[]
): ReactElement<Any, Any> | null {
  return (
    <>
      {data.map((descendant, index) => {
        // render leaf
        if (Text.isText(descendant)) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <PublicLeaf key={index} leaf={descendant}>
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
