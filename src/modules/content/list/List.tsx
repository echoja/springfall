import type { IContentElementProps, IList } from "@modules/content/types";

import style from "./style.module.css";

const List: React.FC<IContentElementProps<IList>> = ({
  children,
  element,
  attributes,
}) => {
  if (element.ordered) {
    return (
      <ol className={style.ol} {...attributes}>
        {children}
      </ol>
    );
  }
  return (
    <ul className={style.ul} {...attributes}>
      {children}
    </ul>
  );
};

export default List;
