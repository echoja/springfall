import type { IList } from "@lib/types";
import type { RenderElementProps } from "slate-react";

export interface IRenderListProps extends RenderElementProps {
  element: IList;
}

function List(props: IRenderListProps) {
  const { element, attributes, children } = props;
  if (element.ordered) {
    return <ol {...attributes}>{children}</ol>;
  }
  return <ul {...attributes}>{children}</ul>;
}

export default List;
