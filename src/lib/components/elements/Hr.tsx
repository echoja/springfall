import { createElementComponent } from "@lib/editor";
import type { IHr } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IHrProps extends RenderElementProps {
  element: IHr;
}

const { EditorComponent: Hr, PublicComponent } =
  createElementComponent<IHrProps>(({ attributes }) => {
    return <hr {...attributes} />;
  });

export const PublicHr = PublicComponent;

export default Hr;
