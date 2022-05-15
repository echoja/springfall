import { createElementComponent } from "@lib/editor";
import type { ICodeBlockElement } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface ICodeBlockElementProps extends RenderElementProps {
  element: ICodeBlockElement;
}

const { EditorComponent: CodeBlockElement, PublicComponent } =
  createElementComponent<ICodeBlockElementProps>(
    ({ children, attributes, element }) => {
      const Tag: keyof JSX.IntrinsicElements = element.tagName;

      return (
        <Tag
          {...attributes}
          contentEditable={false}
          className={(element.properties?.className ?? []).join(" ")}
        >
          {children}
        </Tag>
      );
    }
  );

export const PublicCodeBlockElement = PublicComponent;

export default CodeBlockElement;
