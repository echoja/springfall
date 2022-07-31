import type { CommonRenderElementProps, IImage } from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";
import { useMemo } from "react";
import { useFocused, useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

export interface IImageProps extends CommonRenderElementProps {
  element: IImage;
}

const { EditorComponent: Image, PublicComponent } =
  createElementComponent<IImageProps>(({ children, element, attributes }) => {
    const selected = useSelected();
    const focused = useFocused();
    const classes = useMemo(() => {
      return selected && focused ? "ring-indigo-500" : "";
    }, [focused, selected]);

    const style = useMemo(
      () =>
        element.size.type === "FIT"
          ? {}
          : {
              width: element.size.width,
              height: element.size.height,
            },
      [element.size]
    );

    return (
      <div {...attributes}>
        <div contentEditable={false} className="relative">
          <img
            src={element.url}
            alt={element.alt}
            className={twMerge("block max-w-full", classes)}
            style={{ ...style }}
          />
        </div>
        {children}
      </div>
    );
  });

export const PublicImage = PublicComponent;

export default Image;
