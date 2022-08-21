import type {
  IContentElementProps,
  IImageContainer,
} from "@modules/content/types";

import style from "./style.module.css";

const PublicImageContainer: React.FC<IContentElementProps<IImageContainer>> = ({
  children,
}) => {
  return <div className={style.container}>{children}</div>;
};

export default PublicImageContainer;
