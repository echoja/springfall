import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IContentElementProps, ITableCell } from "@modules/content/types";

import style from "./style.module.css";

const TableCell: React.FC<IContentElementProps<ITableCell>> = ({
  children,
  element,
  attributes,
}) => {
  const selected = useSelected();

  return element.header ? (
    <th
      scope="col"
      className={twMerge(style.th, selected && " bg-blue-50")}
      {...attributes}
    >
      {children}
    </th>
  ) : (
    <td
      className={twMerge(style.td, selected && " bg-blue-50")}
      {...attributes}
    >
      {children}
    </td>
  );
};

export default TableCell;
