import type { IContentElementProps, IImage } from "@modules/content/types";

import style from "./style.module.css";

const PublicImage: React.FC<IContentElementProps<IImage>> = ({
  children,
  element,
}) => {
  return (
    <div className={style["image-wrapper"]}>
      {children}
      <img src={element.url} alt={element.alt} className={style.image} />
    </div>
  );
};

export default PublicImage;
