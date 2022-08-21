import type {
  IContentElementProps,
  IImageCaption,
} from "@modules/content/types";

import isEmptyImageCaption from "./is-empty-image-caption";
import style from "./style.module.css";

const PublicImageCaption: React.FC<IContentElementProps<IImageCaption>> = ({
  children,
  element,
}) => {
  const isEmpty = isEmptyImageCaption(element);

  return isEmpty ? null : (
    <div className="relative">
      <div className={style.caption}>{children}</div>
    </div>
  );
};

export default PublicImageCaption;
