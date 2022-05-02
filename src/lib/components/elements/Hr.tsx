import type { IHr } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderHrProps extends RenderElementProps {
  element: IHr;
}

function Hr(props: IRenderHrProps) {
  const { attributes } = props;
  return <hr {...attributes} />;
}

export default Hr;
