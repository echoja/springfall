/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from "@headlessui/react";
import type { ChangeEvent } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { NodeEntry } from "slate";
import { Editor, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { useHotkeys } from "@common/hooks/use-hotkeys";
import { useMyStoreMemo } from "@common/store";
import { deepclone } from "@common/util";
import codeNodeToString from "@modules/content/code-block/code-node-to-string";
import { createCodeBlock } from "@modules/content/code-block/convert";
import type { ICodeBlock } from "@modules/content/types";

const CodeBlockEditModal: React.FC = () => {
  const uploadButtonRef = useRef(null);
  const editor = useSlateStatic();
  const [content, setContent] = useState("");

  const { isOpen, close, path } = useMyStoreMemo((store) => {
    return {
      path: store.codeBlockEditPath,
      isOpen: store.codeBlockEditPath.length !== 0,
      close: store.closeCodeBlockEditModal,
    };
  }, []);

  const onKeyDownKeyCtrlEnter = useCallback(() => {
    if (isOpen) {
      close();
    }
  }, [close, isOpen]);

  useHotkeys({
    callback: onKeyDownKeyCtrlEnter,
    keys: "cmd+enter, ctrl+enter",
    enabled: isOpen,
  });

  const onClose = useCallback(() => {
    // TODO: 언어 정할 수 있도록 하기
    try {
      const codeBlock = createCodeBlock(content, "plaintext");
      const copiedPath = deepclone(path);
      Transforms.removeNodes(editor, { at: copiedPath });
      Transforms.insertNodes(editor, codeBlock, { at: copiedPath });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    close();
    setContent("");
  }, [close, content, editor, path]);

  // when opened
  useEffect(() => {
    if (isOpen === true && path.length > 0) {
      try {
        const findResult = Editor.node(editor, path) as NodeEntry<ICodeBlock>;
        setContent(codeNodeToString(findResult[0]));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("node not found", e);
      }
    }
  }, [editor, isOpen, path]);

  const onTextareaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <Dialog
      as="div"
      className="relative z-10"
      initialFocus={uploadButtonRef}
      onClose={onClose}
      open={isOpen}
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Dialog.Panel className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <Dialog.Title
                as="h3"
                className="mb-3 text-lg font-medium leading-6 text-gray-900"
              >
                코드 수정
              </Dialog.Title>

              <textarea
                rows={40}
                className="block w-full py-2 placeholder-gray-500 border-0 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="코드를 작성하세요"
                onChange={onTextareaChange}
                value={content}
              />
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
export default memo(CodeBlockEditModal);
