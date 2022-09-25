import type { IContentElementProps, IListItem } from "@modules/content/types";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import style from "./style.module.css";

const ListItem: React.FC<IContentElementProps<IListItem>> = ({
  children,
  attributes,
}) => {
  const selected = useSelected();

  return (
    <li
      className={twMerge(style.li, selected && "ring-1 ring-offset-8")}
      {...attributes}
    >
      {children}
    </li>
  );
};

export default ListItem;
