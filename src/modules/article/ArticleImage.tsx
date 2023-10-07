import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ReactElement } from "react";

import style from "./style.module.css";
import { twMerge } from "tailwind-merge";

export default function ArticleImage({
  img,
  caption,
  alt,
  width,
  noShadow,
}: {
  img: StaticImageData;
  caption?: React.ReactNode;
  width?: number;
  alt: string;
  noShadow?: boolean;
}): ReactElement {
  return (
    <figure className={style["image-figure"]}>
      <Image
        className={twMerge(style.image, noShadow && style["no-shadow"])}
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
