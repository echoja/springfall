import { createElementComponent } from "@lib/editor";
import type { IList } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IListProps extends RenderElementProps {
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
