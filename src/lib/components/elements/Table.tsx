import type { ITable } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderTableProps extends RenderElementProps {
  element: ITable;
}

function Table(props: IRenderTableProps) {
  const { attributes, children } = props;
  return (
    <table {...attributes}>
      <th>
        <td>
          <div>{children}</div>
        </td>
      </th>
    </table>
  );
}

export default Table;
