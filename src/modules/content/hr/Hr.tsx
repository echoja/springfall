import type { CommonRenderElementProps, IHr } from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

export interface IHrProps extends CommonRenderElementProps {
  element: IHr;
}

const { EditorComponent: Hr, PublicComponent } =
  createElementComponent<IHrProps>(({ attributes }) => {
    return <hr className="my-4" {...attributes} />;
  });

export const PublicHr = PublicComponent;

export default Hr;
