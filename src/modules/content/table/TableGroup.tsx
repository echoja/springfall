import type { IContentElementProps, ITableGroup } from "@modules/content/types";

import style from "./style.module.css";

const TableGroup: React.FC<IContentElementProps<ITableGroup>> = ({
  children,
  element,
  attributes,
}) => {
  switch (element.role) {
    case "head":
      return (
        <thead className={style.thead} {...attributes}>
          {children}
        </thead>
      );
    case "body":
      return (
        <tbody className={style.tbody} {...attributes}>
          {children}
        </tbody>
      );
    case "foot":
      return (
        <tfoot className={style.tfoot} {...attributes}>
          {children}
        </tfoot>
      );
    default:
      return null;
  }
};

export default TableGroup;
