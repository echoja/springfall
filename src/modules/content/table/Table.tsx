import type { IContentElementProps, ITable } from "@modules/content/types";

import style from "./style.module.css";

const Table: React.FC<IContentElementProps<ITable>> = ({
  children,
  attributes,
}) => {
  return (
    <div className={style["wrapper-1"]} {...attributes}>
      <div className={style["wrapper-2"]}>
        <div className={style["wrapper-3"]}>
          <table className={style.table}>{children}</table>
        </div>
      </div>
    </div>
  );
};

export default Table;
