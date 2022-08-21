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
    default:
      return <pre>{JSON.stringify(element)}</pre>;
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
