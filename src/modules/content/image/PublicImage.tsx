import type { IContentElementProps, IImage } from "@modules/content/types";
import NextImage from "next/image";

import style from "./style.module.css";

const PublicImage: React.FC<IContentElementProps<IImage>> = ({ element }) => {
  return (
    <div className={style["image-wrapper"]}>
      {element.height && element.width ? (
        <NextImage
          src={element.url}
          width={element.width}
          height={element.height}
          alt={element.alt}
          className={style.image}
        />
      ) : (
        <img src={element.url} alt={element.alt} className={style.image} />
      )}
    </div>
  );
};

export default PublicImage;
