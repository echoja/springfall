import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMyStoreMemo } from "@lib/store";
import type {
  CodeBlockComponent,
  ICodeBlock,
  ICommonCodeBlockProps,
} from "@lib/types";
import { convertCodeBlockToString } from "@lib/types";
import type { CSSProperties, ReactNode } from "react";
import type React from "react";
import { useCallback } from "react";
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { twMerge } from "tailwind-merge";

import CopyButton from "../CopyButton";

const EditButton: React.FC<{
  element: ICodeBlock;
}> = ({ element }) => {
  const editor = useSlateStatic();

  const openCodeBlockEditModal = useMyStoreMemo(
    (store) => store.openCodeBlockEditModal,
    []
  );

  const onEditButtonClick = useCallback(() => {
    if (editor) {
      const path = ReactEditor.findPath(editor, element);
      openCodeBlockEditModal(path);
    }
  }, [editor, element, openCodeBlockEditModal]);

  if (!editor) {
    return null;
  }

  return (
    <button type="button" onClick={onEditButtonClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
};

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
            "p-3 bg-slate-700 text-white mb-3 relative rounded-lg shadow-lg overflow-x-auto",
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

const Buttons: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (!Array.isArray(children) && children) ||
    (Array.isArray(children) &&
      children.filter((v) => Boolean(v)).length !== 0) ? (
    <div className="absolute inline-flex items-center gap-3 text-white top-3 right-3">
      {children}
    </div>
  ) : null;
};

export const PublicCodeBlock: CodeBlockComponent = ({ children, element }) => {
  return (
    <CodeBlockLayout
      element={element}
      renderedButtons={
        <Buttons>
          {element.showCopy && (
            <CopyButton getString={() => convertCodeBlockToString(element)} />
          )}
        </Buttons>
      }
    >
      {children}
    </CodeBlockLayout>
  );
};

export const CodeBlock: CodeBlockComponent = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <CodeBlockLayout
      style={{ boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : "none" }}
      element={element}
      attributes={attributes}
      renderedButtons={
        <Buttons>
          {element.showCopy && (
            <CopyButton getString={() => convertCodeBlockToString(element)} />
          )}
          <EditButton element={element} />
        </Buttons>
      }
    >
      {children}
    </CodeBlockLayout>
  );
};
