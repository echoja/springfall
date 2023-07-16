import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ReactElement } from "react";

import style from "./style.module.css";

export default function ArticleImage({
  img,
  caption,
  alt,
  width,
}: {
  img: StaticImageData;
  caption?: React.ReactNode;
  width?: number;
  alt: string;
}): ReactElement {
  return (
    <figure className={style["image-figure"]}>
      <Image className={style.image} width={width} src={img} alt={alt} />
      {caption && (
        <figcaption className={style["image-caption"]}>{caption}</figcaption>
      )}
    </figure>
  );
}
