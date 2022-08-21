import type {
  IContentElementProps,
  IImageContainer,
} from "@modules/content/types";

import style from "./style.module.css";

const ImageContainer: React.FC<IContentElementProps<IImageContainer>> = ({
  children,
  attributes,
}) => {
  return (
    <div {...attributes} className={style.container}>
      {children}
    </div>
  );
};

export default ImageContainer;
