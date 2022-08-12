import type { ICodeLine, IContentElementProps } from "@modules/content/types";

import style from "./code-line-style.module.css";

const CodeLine: React.FC<IContentElementProps<ICodeLine>> = ({
  children,
  attributes,
}) => {
  return (
    <div
      {...attributes}
      className={style.line}
      // className={(element.properties?.className ?? []).join(" ")}
    >
      {children}
    </div>
  );
};

export default CodeLine;
