import type { IContentElementProps, IListItem } from "@modules/content/types";

const PublicListItem: React.FC<IContentElementProps<IListItem>> = ({
  children,
  attributes,
}) => {
  return <li {...attributes}>{children}</li>;
};

export default PublicListItem;
