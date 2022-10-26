import type { IContentElementProps, IImage } from "@modules/content/types";
import NextImage from "next/image";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import style from "./style.module.css";

const Image: React.FC<IContentElementProps<IImage>> = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();

  return (
    <div
      {...attributes}
      className={twMerge(style["image-wrapper"], selected && "ring")}
    >
      {children}
      {element.height && element.width ? (
        <NextImage
          draggable={false}
          src={element.url}
          width={element.width}
          height={element.height}
          // TODO: alt 속성 필수로 변경
          alt={element.alt ?? ""}
          className={twMerge(style.image)}
        />
      ) : (
        <img
          draggable={false}
          src={element.url}
          alt={element.alt}
          className={twMerge(style.image)}
        />
      )}
    </div>
  );
};

export default Image;
