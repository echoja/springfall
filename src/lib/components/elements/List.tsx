import { createElementComponent } from "@lib/editor";
import type { CommonRenderElementProps, IList } from "@lib/types";

export interface IListProps extends CommonRenderElementProps {
  element: IList;
}

const { EditorComponent: List, PublicComponent } =
  createElementComponent<IListProps>(({ children, element, attributes }) => {
    if (element.ordered) {
      return <ol {...attributes}>{children}</ol>;
    }
    return <ul {...attributes}>{children}</ul>;
  });

export const PublicList = PublicComponent;

export default List;
