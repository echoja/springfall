import Link, { PublicLink } from "@modules/content/link/component";
import type { ReactElement } from "react";
import type { Descendant } from "slate";
import { Text } from "slate";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { SetOptional } from "type-fest";

import type { RenderPublicElementProps } from "../modules/content/types";

import Callout, { PublicCallout } from "./components/elements/Callout";
import { CodeBlock, PublicCodeBlock } from "./components/elements/CodeBlock";
import CodeBlockElement, {
  PublicCodeBlockElement,
} from "./components/elements/CodeBlockElement";
import Heading, { PublicHeading } from "./components/elements/Heading";
import Hr, { PublicHr } from "./components/elements/Hr";
import Image, { PublicImage } from "./components/elements/Image";
import List, { PublicList } from "./components/elements/List";
import Paragraph, { PublicParagraph } from "./components/elements/Paragraph";
import Table, { PublicTable } from "./components/elements/Table";
import Youtube, { PublicYoutube } from "./components/elements/Youtube";
import { Leaf, PublicLeaf } from "./components/Leaf";

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
    case "LINK":
      return <PublicLink {...props} element={element} />;
    default:
      return <PublicParagraph {...props} element={element} />;
  }
}

export function renderElement(props: RenderElementProps) {
  const { element } = props;
  switch (element.type) {
    case "CODE_BLOCK":
      return <CodeBlock {...props} element={element} />;
    case "CODE_BLOCK_ELEMENT":
      return <CodeBlockElement {...props} element={element} />;
    case "IMAGE_CAPTION":
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
    case "IMAGE":
      return <Image {...props} element={element} />;
    case "LINK":
      return <Link {...props} element={element} />;
    default:
      return <Paragraph {...props} element={element} />;
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
        // render leaf
        if (Text.isText(descendant)) {
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
