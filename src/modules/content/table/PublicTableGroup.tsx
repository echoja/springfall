import type { IContentElementProps, ITableGroup } from "@modules/content/types";

import style from "./style.module.css";

const PublicTableGroup: React.FC<IContentElementProps<ITableGroup>> = ({
  children,
  element,
}) => {
  switch (element.role) {
    case "head":
      return <thead className={style.thead}>{children}</thead>;
    case "body":
      return <tbody className={style.tbody}>{children}</tbody>;
    case "foot":
      return <tfoot className={style.tfoot}>{children}</tfoot>;
    default:
      return null;
  }
};

export default PublicTableGroup;
