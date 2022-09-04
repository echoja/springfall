import type { IContentElementProps, IImage } from "@modules/content/types";
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
  const classes = useMemo(() => {
    return selected ? "ring ring-indigo-500" : "";
  }, [selected]);

  return (
    <div {...attributes} className={style["image-wrapper"]}>
      {children}
      <img
        src={element.url}
        alt={element.alt}
        className={twMerge(style.image, classes)}
      />
    </div>
  );
};

export default Image;
