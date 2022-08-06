import type { CommonRenderElementProps, ITable } from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

export interface ITableProps extends CommonRenderElementProps {
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
