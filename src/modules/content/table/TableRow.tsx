import type { IContentElementProps, ITableRow } from "@modules/content/types";

import style from "./style.module.css";

const TableRow: React.FC<IContentElementProps<ITableRow>> = ({
  children,
  attributes,
}) => {
  return (
    <tr className={style.tr} {...attributes}>
      {children}
    </tr>
  );
};

export default TableRow;
