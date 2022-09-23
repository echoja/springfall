import type { IContentElementProps, IList } from "@modules/content/types";

import style from "./style.module.css";

const List: React.FC<IContentElementProps<IList>> = ({
  children,
  element,
  attributes,
}) => {
  if (element.ordered) {
    return (
      <ol className={`${style.list} ${style["ordered-list"]}`} {...attributes}>
        {children}
      </ol>
    );
  }
  return (
    <ul className={`${style.list} ${style["unordered-list"]}`} {...attributes}>
      {children}
    </ul>
  );
};

export default List;
