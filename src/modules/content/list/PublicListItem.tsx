import type { IContentElementProps, IListItem } from "@modules/content/types";

import style from "./style.module.css";

const PublicListItem: React.FC<IContentElementProps<IListItem>> = ({
  children,
}) => {
  return <li className={style.li}>{children}</li>;
};

export default PublicListItem;
