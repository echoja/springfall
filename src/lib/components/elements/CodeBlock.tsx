import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createElementComponent } from "@lib/editor";
import useSafeSlateSelector from "@lib/hooks/use-safe-slate-selector";
import { useMyStoreWithMemoizedSelector } from "@lib/store";
import type { ICodeBlock } from "@lib/types";
import { useCallback } from "react";
import type { RenderElementProps } from "slate-react";
import { ReactEditor, useFocused, useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

export interface ICodeBlockProps extends RenderElementProps {
  element: ICodeBlock;
}

const { EditorComponent: CodeBlock, PublicComponent } =
  createElementComponent<ICodeBlockProps>(
    ({ children, attributes, element }) => {
      const selected = useSelected();
      const focused = useFocused();
      const boxShadow = selected && focused ? "0 0 0 3px #B4D5FF" : "none";
      const editor = useSafeSlateSelector();

      const openCodeBlockEditModal = useMyStoreWithMemoizedSelector(
        (store) => store.openCodeBlockEditModal,
        []
      );

      const onEditButtonClick = useCallback(() => {
        if (editor) {
          const path = ReactEditor.findPath(editor, element);
          openCodeBlockEditModal(path);
        }
      }, [editor, element, openCodeBlockEditModal]);

      return (
        <pre
          {...attributes}
          className="p-3 bg-slate-700 text-white mb-2 relative"
          style={{ boxShadow }}
        >
          <code className="relative">{children}</code>
          {editor && (
            <button
              type="button"
              onClick={onEditButtonClick}
              className={twMerge("absolute top-3 right-3")}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
        </pre>
      );
    }
  );

export const PublicCodeBlock = PublicComponent;

export default CodeBlock;
