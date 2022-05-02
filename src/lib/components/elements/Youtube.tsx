import { createElementComponent } from "@lib/editor";
import type { IYoutube } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IYoutubeProps extends RenderElementProps {
  element: IYoutube;
}

const { EditorComponent: Youtube, PublicComponent } =
  createElementComponent<IYoutubeProps>(({ element, attributes }) => {
    return <div {...attributes}>iframeUrl: {element.iframeUrl}</div>;
  });

export const PublicYoutube = PublicComponent;

export default Youtube;
