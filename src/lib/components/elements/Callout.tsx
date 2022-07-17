import type {
  CommonRenderElementProps,
  ICallout,
} from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

export interface IRenderCalloutProps extends CommonRenderElementProps {
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
