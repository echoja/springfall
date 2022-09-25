import type { IContentElementProps, ITable } from "@modules/content/types";

import style from "./style.module.css";

const PublicTable: React.FC<IContentElementProps<ITable>> = ({ children }) => {
  return (
    <div className={style["wrapper-1"]}>
      <div className={style["wrapper-2"]}>
        <div className={style["wrapper-3"]}>
          <table className={style.table}>{children}</table>
        </div>
      </div>
    </div>
  );
};

export default PublicTable;
