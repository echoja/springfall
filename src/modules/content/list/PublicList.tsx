import type { IContentElementProps, IList } from "@modules/content/types";

import style from "./style.module.css";

const List: React.FC<IContentElementProps<IList>> = ({ children, element }) => {
  if (element.ordered) {
    return <ol className={style.ol}>{children}</ol>;
  }
  return <ul className={style.ul}>{children}</ul>;
};

export default List;
