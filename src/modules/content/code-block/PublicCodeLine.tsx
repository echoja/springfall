import type { ICodeLine, IContentElementProps } from "@modules/content/types";
import { twMerge } from "tailwind-merge";

import style from "./code-line-style.module.css";

const PublicCodeLine: React.FC<IContentElementProps<ICodeLine>> = ({
  children,
  attributes,
  element,
}) => {
  return (
    <div
      {...attributes}
      className={twMerge(
        style.line,
        element.format === "info" && "bg-blue-400/30",
        element.format === "added" && "bg-green-400/30",
        element.format === "deleted" && "bg-red-400/30"
      )}
    >
      {children}
    </div>
  );
};

export default PublicCodeLine;
