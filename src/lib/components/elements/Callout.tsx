import type { ICallout } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderCalloutProps extends RenderElementProps {
  element: ICallout;
}

function Callout(props: IRenderCalloutProps) {
  const { element, attributes, children } = props;
  return (
    <div className="flex" {...attributes}>
      <div>icon: {element.icon}</div>
      <div>{children}</div>
    </div>
  );
}

export default Callout;
