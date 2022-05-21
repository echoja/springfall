import { createElementComponent } from "@lib/editor";
import type { CommonRenderElementProps, ICodeBlockElement } from "@lib/types";

export interface ICodeBlockElementProps extends CommonRenderElementProps {
  element: ICodeBlockElement;
}

const { EditorComponent: CodeBlockElement, PublicComponent } =
  createElementComponent<ICodeBlockElementProps>(
    ({ children, attributes, element }) => {
      const Tag: keyof JSX.IntrinsicElements = element.tagName;

      return (
        <Tag
          {...attributes}
          className={(element.properties?.className ?? []).join(" ")}
        >
          {children}
        </Tag>
      );
    }
  );

export const PublicCodeBlockElement = PublicComponent;

export default CodeBlockElement;
