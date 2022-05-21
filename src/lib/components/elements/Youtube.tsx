import { createElementComponent } from "@lib/editor";
import type { CommonRenderElementProps, IYoutube } from "@lib/types";

export interface IYoutubeProps extends CommonRenderElementProps {
  element: IYoutube;
}

const { EditorComponent: Youtube, PublicComponent } =
  createElementComponent<IYoutubeProps>(({ element, attributes }) => {
    return <div {...attributes}>iframeUrl: {element.iframeUrl}</div>;
  });

export const PublicYoutube = PublicComponent;

export default Youtube;
