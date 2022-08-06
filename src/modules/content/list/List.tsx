import type { IContentElementProps, IList } from "@modules/content/types";

const List: React.FC<IContentElementProps<IList>> = ({
  children,
  element,
  attributes,
}) => {
  if (element.ordered) {
    return <ol {...attributes}>{children}</ol>;
  }
  return <ul {...attributes}>{children}</ul>;
};

export default List;
