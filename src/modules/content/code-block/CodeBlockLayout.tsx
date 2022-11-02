import CopyButton from "@modules/admin-ui/CopyButton";
import type { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import type { ICodeBlock, IContentElementProps } from "../types";

import layoutStyle from "./style.module.css";

const CodeBlockLayout: React.FC<{
  element: ICodeBlock;
  renderedButtons: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  attributes?: IContentElementProps<ICodeBlock>["attributes"];
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
      <div className="relative -mx-4 sm:-mx-6 md:mx-0">
        <pre
          {...attributes}
          className={twMerge(layoutStyle["code-block-layout"], className)}
          style={style}
        >
          <code className="relative flex flex-col min-w-max">{children}</code>
        </pre>
        {renderedButtons}
      </div>
    </div>
  );
};

export default CodeBlockLayout;
