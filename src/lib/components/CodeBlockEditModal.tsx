/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from "@headlessui/react";
import { useHotkeys } from "@lib/hooks/use-hotkeys";
import { useMyStoreWithMemoizedSelector } from "@lib/store";
import type {
  ICodeBlock,
  ICodeBlockElement,
  ICodeBlockText,
  IText,
} from "@lib/types";
import type { Draft } from "immer";
import produce from "immer";
import type { ChangeEvent } from "react";
import { useEffect, memo, useCallback, useRef, useState } from "react";
import type { RefractorElement, RefractorRoot, Text } from "refractor";
import { refractor } from "refractor";
import tsxLang from "refractor/lang/tsx";
import type { NodeEntry, Element } from "slate";
import { Transforms, Editor } from "slate";
import { useSlateStatic } from "slate-react";

refractor.register(tsxLang);

function codeNodeToString(
  node: ICodeBlock | ICodeBlockElement | ICodeBlockText | IText,
  acc: string[]
) {
  if (node.type === "CODE_BLOCK_TEXT" || node.type === "TEXT") {
    acc.push(node.text);
  } else if (node.type === "CODE_BLOCK_ELEMENT" || node.type === "CODE_BLOCK") {
    node.children.forEach((child) => codeNodeToString(child, acc));
  }
}

function convertRefractorNodes(
  node: RefractorElement | Text
): ICodeBlockElement | ICodeBlockText {
  if (node.type === "element") {
    return {
      type: "CODE_BLOCK_ELEMENT",
      children: node.children.map((child) => convertRefractorNodes(child)),
      tagName: node.tagName as "span",
      properties: {
        className: node.properties?.className as string[] | undefined,
      },
    };
  }
  if (node.type === "text") {
    return {
      type: "CODE_BLOCK_TEXT",
      text: node.value,
    };
  }
  throw new Error("Unknown node type");
}

function refractorRootToCodeBlock(root: RefractorRoot): ICodeBlock {
  const children = root.children.map((node) => convertRefractorNodes(node));
  return {
    type: "CODE_BLOCK",
    children,
    lang: "tsx",
    showCopy: true,
    showLines: true,
  };
}

function convertCodeBlockToString(node: ICodeBlock) {
  const result: string[] = [];
  codeNodeToString(node, result);
  return result.join("");
}

const CodeBlockEditModal: React.FC = () => {
  const uploadButtonRef = useRef(null);
  const editor = useSlateStatic();
  const [content, setContent] = useState("");
  const { editingPost, setEditingPost } = useMyStoreWithMemoizedSelector(
    (store) => ({
      editingPost: store.editingPost,
      setEditingPost: store.setEditingPost,
    }),
    []
  );

  const { isOpen, close, path } = useMyStoreWithMemoizedSelector((store) => {
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
  });

  const onClose = useCallback(() => {
    // TODO: 언어 정할 수 있도록 하기
    const formatted = refractor.highlight(content, "tsx");
    try {
      const converted = refractorRootToCodeBlock(formatted);
      Transforms.setNodes<ICodeBlock>(
        editor,
        { children: converted.children },
        {
          at: path,
        }
      );
      setEditingPost(
        produce(editingPost, (draft) => {
          const copiedPath = [...path];
          const firstIndex = copiedPath.shift() as number;
          const firstBlock = draft.content.data[firstIndex] as Draft<Element>;
          const block = copiedPath.reduce<Element>(
            (acc, cur) => (acc as Element).children[cur] as Element,
            firstBlock
          );
          block.children = converted.children;
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    close();
    setContent("");
  }, [close, content, editingPost, editor, path, setEditingPost]);

  // when opened
  useEffect(() => {
    if (isOpen === true && path.length > 0) {
      try {
        const findResult = Editor.node(editor, path) as NodeEntry<ICodeBlock>;
        setContent(convertCodeBlockToString(findResult[0]));
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
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900 mb-3"
              >
                코드 수정
              </Dialog.Title>

              <textarea
                rows={40}
                className="block w-full border-0 py-2 resize-none placeholder-gray-500 focus:ring-2 rounded-lg focus:ring-indigo-500 sm:text-sm"
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
