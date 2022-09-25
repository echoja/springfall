import type { IContentElementProps, ITableRow } from "@modules/content/types";

import style from "./style.module.css";

const PublicTableRow: React.FC<IContentElementProps<ITableRow>> = ({
  children,
}) => {
  return <tr className={style.tr}>{children}</tr>;
};

export default PublicTableRow;
