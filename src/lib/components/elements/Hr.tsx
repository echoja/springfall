import { createElementComponent } from "@lib/editor";
import type { CommonRenderElementProps, IHr } from "@lib/types";

export interface IHrProps extends CommonRenderElementProps {
  element: IHr;
}

const { EditorComponent: Hr, PublicComponent } =
  createElementComponent<IHrProps>(({ attributes }) => {
    return <hr className="my-4" {...attributes} />;
  });

export const PublicHr = PublicComponent;

export default Hr;
