import { useMyStoreMemo } from "@common/store";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ICodeBlock, IContentElementProps } from "@modules/content/types";
import type React from "react";
import { useCallback } from "react";
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";

import CopyButton from "../../admin-ui/CopyButton";

import Buttons from "./Buttons";
import codeNodeToString from "./code-node-to-string";
import CodeBlockLayout from "./CodeBlockLayout";

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

const CodeBlock: React.FC<IContentElementProps<ICodeBlock>> = ({
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
            <CopyButton getString={() => codeNodeToString(element)} />
          )}
          <EditButton element={element} />
        </Buttons>
      }
    >
      {children}
    </CodeBlockLayout>
  );
};

export default CodeBlock;
