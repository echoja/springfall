import type { IYoutube } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderYoutubeProps extends RenderElementProps {
  element: IYoutube;
}

function Youtube(props: IRenderYoutubeProps) {
  const { element, attributes } = props;
  return <div {...attributes}>iframeUrl: {element.iframeUrl}</div>;
}

export default Youtube;
