import type {
  CommonRenderElementProps,
  IYoutube,
} from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

export interface IYoutubeProps extends CommonRenderElementProps {
  element: IYoutube;
}

const { EditorComponent: Youtube, PublicComponent } =
  createElementComponent<IYoutubeProps>(({ element, attributes }) => {
    return <div {...attributes}>iframeUrl: {element.iframeUrl}</div>;
  });

export const PublicYoutube = PublicComponent;

export default Youtube;
