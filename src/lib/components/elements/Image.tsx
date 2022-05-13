import { createElementComponent } from "@lib/editor";
import type { IImage } from "@lib/types";
import NextImage from "next/image";
import type { RenderElementProps } from "slate-react";

export interface IImageProps extends RenderElementProps {
  element: IImage;
}

const { EditorComponent: Image, PublicComponent } =
  createElementComponent<IImageProps>(({ children, element, attributes }) => {
    const sizeProps =
      element.size.type === "FIT"
        ? {
            layout: "fill" as const,
          }
        : {
            width: element.size.width,
            height: element.size.height,
          };

    return (
      <div
        {...attributes}
        className={element.size.type === "FIT" ? "relative" : ""}
      >
        <NextImage src={element.url} alt={element.alt} {...sizeProps} />
        <div className="caption">{children}</div>
      </div>
    );
  });

export const PublicImage = PublicComponent;

export default Image;
