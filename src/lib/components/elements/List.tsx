import type { CommonRenderElementProps, IList } from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";

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
