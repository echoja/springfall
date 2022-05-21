import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSafeSlateSelector from "@lib/hooks/use-safe-slate-selector";
import { useMyStoreMemo } from "@lib/store";
import type {
  ICodeBlock,
  PublicElementComponent as CommonElementComponent,
} from "@lib/types";
import { convertCodeBlockToString } from "@lib/types";
import { useCallback } from "react";
import type { RenderElementProps } from "slate-react";
import { ReactEditor, useFocused, useSelected } from "slate-react";

import CopyButton from "../CopyButton";

export interface ICodeBlockProps extends RenderElementProps {
  element: ICodeBlock;
}

export const PublicCodeBlock: CommonElementComponent<ICodeBlockProps> = ({
  children,
  element,
}) => {
  const getString = useCallback(
    () => convertCodeBlockToString(element),
    [element]
  );

  return (
    <pre className="p-3 bg-slate-700 text-white mb-2 relative rounded-lg shadow-lg">
      <code className="relative">{children}</code>
      <div className="flex gap-3 items-center absolute top-3 right-3">
        {element.showCopy && <CopyButton getString={getString} />}
      </div>
    </pre>
  );
};

export const CodeBlock: CommonElementComponent<ICodeBlockProps> = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();
  const boxShadow = selected && focused ? "0 0 0 3px #B4D5FF" : "none";
  const editor = useSafeSlateSelector();

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

  const getString = useCallback(
    () => convertCodeBlockToString(element),
    [element]
  );

  return (
    <pre
      {...attributes}
      className="p-3 bg-slate-700 text-white mb-2 relative"
      style={{ boxShadow }}
    >
      <code className="relative">{children}</code>
      <div className="flex gap-3 items-center absolute top-3 right-3">
        {element.showCopy && <CopyButton getString={getString} />}
        {editor && (
          <button type="button" onClick={onEditButtonClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        )}
      </div>
    </pre>
  );
};

export default CodeBlock;
