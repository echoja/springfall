import type { IContentElementProps, IImage } from "@modules/content/types";
import NextImage from "next/image";
import { useMemo } from "react";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import style from "./style.module.css";

const Image: React.FC<IContentElementProps<IImage>> = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();
  const selectedClass = useMemo(() => {
    return selected ? "ring ring-indigo-500" : "";
  }, [selected]);

  return (
    <div
      {...attributes}
      className={twMerge(style["image-wrapper"], selectedClass)}
    >
      {children}
      {element.height && element.width ? (
        <NextImage
          src={element.url}
          width={element.width}
          height={element.height}
          alt={element.alt}
          className={twMerge(style.image)}
        />
      ) : (
        <img
          src={element.url}
          alt={element.alt}
          className={twMerge(style.image)}
        />
      )}
    </div>
  );
};

export default Image;
