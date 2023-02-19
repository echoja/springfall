import NextImage from "next/image";

import type { IContentElementProps, IImage } from "@modules/content/types";

import style from "./style.module.css";

const PublicImage: React.FC<IContentElementProps<IImage>> = ({ element }) => {
  return (
    <div className={style["image-wrapper"]}>
      {element.height && element.width ? (
        <NextImage
          src={element.url}
          width={element.width}
          height={element.height}
          // TODO: alt 속성 필수로 변경
          alt={element.alt ?? ""}
          className={style.image}
        />
      ) : (
        <img src={element.url} alt={element.alt} className={style.image} />
      )}
    </div>
  );
};

export default PublicImage;
