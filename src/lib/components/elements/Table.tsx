import { createElementComponent } from "@lib/editor";
import type { ITable } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface ITableProps extends RenderElementProps {
  element: ITable;
}
const { EditorComponent: Table, PublicComponent } =
  createElementComponent<ITableProps>(({ children, attributes }) => {
    return (
      <table {...attributes}>
        <th>
          <td>
            <div>{children}</div>
          </td>
        </th>
      </table>
    );
  });

export const PublicTable = PublicComponent;

export default Table;
