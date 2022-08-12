import type { ICodeLine, IContentElementProps } from "@modules/content/types";

import style from "./code-line-style.module.css";

const PublicCodeLine: React.FC<IContentElementProps<ICodeLine>> = ({
  children,
  attributes,
}) => {
  return (
    <div {...attributes} className={style.line}>
      {children}
    </div>
  );
};

export default PublicCodeLine;
