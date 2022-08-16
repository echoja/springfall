import CopyButton from "@modules/admin-ui/CopyButton";
import type { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import type { ICodeBlock, ICommonCodeBlockProps } from "../types";

const CodeBlockLayout: React.FC<{
  element: ICodeBlock;
  renderedButtons: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  attributes?: ICommonCodeBlockProps["attributes"];
  className?: string;
}> = ({ renderedButtons, attributes, children, element, style, className }) => {
  return (
    <div className="flex flex-col">
      {element.label && (
        <div
          className="inline-flex px-2 py-1 ml-3 mr-auto font-mono text-xs transition-colors rounded-tl rounded-tr shadow-xl bg-slate-200 dark:text-gray-100 dark:bg-slate-600"
          contentEditable={false}
        >
          <span className="inline-flex mr-2">
            {element.url ? (
              <a href={element.url} target="_blank" rel="noreferrer">
                {element.label}
              </a>
            ) : (
              <span>{element.label}</span>
            )}
          </span>

          <CopyButton getString={() => element.label ?? ""} />
        </div>
      )}
      <div className="relative">
        <pre
          {...attributes}
          className={twMerge(
            "py-3 bg-slate-700 text-white mb-3 relative rounded-lg shadow-lg overflow-x-auto",
            className
          )}
          style={style}
        >
          <code className="relative">{children}</code>
        </pre>
        {renderedButtons}
      </div>
    </div>
  );
};

export default CodeBlockLayout;
