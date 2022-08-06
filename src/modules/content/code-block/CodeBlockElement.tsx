import type {
  CommonRenderElementProps,
  ICodeBlockElement,
} from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

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
