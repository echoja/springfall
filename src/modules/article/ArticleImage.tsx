import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ReactElement } from "react";

import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export default function ArticleImage({
  img,
  caption,
  alt,
  width,
  noShadow,
  border,
}: {
  img: StaticImageData;
  caption?: React.ReactNode;
  width?: number;
  alt: string;
  noShadow?: boolean;
  border?: boolean;
}): ReactElement {
  return (
    <figure className={style["image-figure"]}>
      <Image
        className={twMerge(
          style.image,
          noShadow && style["no-shadow"],
          border && style["image-border"],
        )}
        width={width}
        src={img}
        alt={alt}
      />

      {caption && (
        <figcaption className={style["image-caption"]}>{caption}</figcaption>
      )}
    </figure>
  );
}
