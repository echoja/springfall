import type { IContentElementProps, ITableCell } from "@modules/content/types";

import style from "./style.module.css";

const PublicTableCell: React.FC<IContentElementProps<ITableCell>> = ({
  children,
  element,
}) => {
  return element.header ? (
    <th className={style.th}>{children}</th>
  ) : (
    <td className={style.td}>{children}</td>
  );
};

export default PublicTableCell;
