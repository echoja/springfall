import { createElementComponent } from "@lib/editor";
import type { ICallout } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderCalloutProps extends RenderElementProps {
  element: ICallout;
}

const { EditorComponent: Callout, PublicComponent } =
  createElementComponent<IRenderCalloutProps>(
    ({ children, element, attributes }) => {
      return (
        <div className="flex" {...attributes}>
          <div>icon: {element?.icon}</div>
          <div>{children}</div>
        </div>
      );
    }
  );

export const PublicCallout = PublicComponent;

export default Callout;
