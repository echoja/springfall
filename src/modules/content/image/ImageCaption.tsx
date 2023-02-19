import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type {
  IContentElementProps,
  IImageCaption,
} from "@modules/content/types";

import isEmptyImageCaption from "./is-empty-image-caption";
import style from "./style.module.css";

const ImageCaption: React.FC<IContentElementProps<IImageCaption>> = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();
  const isEmpty = isEmptyImageCaption(element);

  return (
    <div
      {...attributes}
      className="relative"
      style={{ maxWidth: `${element.width}px` }}
    >
      <div className={twMerge("rounded", selected && "ring ", style.caption)}>
        {children}
      </div>
      {isEmpty ? (
        <span
          contentEditable={false}
          className="absolute block font-sans text-sm text-gray-400 pointer-events-none top-2 left-2 -z-10"
        >
          이미지 캡션이 비어있습니다.
        </span>
      ) : null}
    </div>
  );
};

export default ImageCaption;
