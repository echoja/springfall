import type { IContentElementProps, IList } from "@modules/content/types";

const List: React.FC<IContentElementProps<IList>> = ({ children, element }) => {
  if (element.ordered) {
    return <ol>{children}</ol>;
  }
  return <ul>{children}</ul>;
};

export default List;
