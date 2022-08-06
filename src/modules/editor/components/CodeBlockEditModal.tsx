/* This example requires Tailwind CSS v2.0+ */
import { useHotkeys } from "@common/hooks/use-hotkeys";
import { useMyStoreMemo } from "@common/store";
import { convertCodeBlockToString } from "@common/util";
import { Dialog } from "@headlessui/react";
import type {
  ICodeBlock,
  ICodeBlockElement,
  ICodeBlockText,
} from "@modules/content/types";
import type { ChangeEvent } from "react";
import { useEffect, memo, useCallback, useRef, useState } from "react";
import type { RefractorElement, RefractorRoot, Text } from "refractor";
import { refractor } from "refractor";
import tsxLang from "refractor/lang/tsx";
import type { NodeEntry } from "slate";
import { Transforms, Editor } from "slate";
import { useSlateStatic } from "slate-react";

refractor.register(tsxLang);

function convertRefractorNodes(
  node: RefractorElement | Text,
  shouldWrapText: boolean
): ICodeBlockElement | ICodeBlockText {
  /**
   * 첫 번째 child 가 element 라면 형제 text 노드들은 무조건 element로 감싸져야 함.
   * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
   */
  let firstChildType: "element" | "text" | undefined;

  if (node.type === "element") {
    return {
      type: "CODE_BLOCK_ELEMENT",
      children: node.children.map((child, index) => {
        if (index === 0) {
          firstChildType = child.type;
        }
        return convertRefractorNodes(child, firstChildType === "element");
      }),
      tagName: node.tagName as "span",
      properties: {
        className: node.properties?.className as string[] | undefined,
      },
    };
  }

  if (node.type === "text" && shouldWrapText) {
    return {
      type: "CODE_BLOCK_ELEMENT",
      children: [
        {
          type: "CODE_BLOCK_TEXT",
          text: node.value,
        },
      ],
      tagName: "span",
      properties: {
        className: ["token text-wrapper"],
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
  const children = root.children.map((node) =>
    convertRefractorNodes(node, root.children[0]?.type === "element")
  );

  return {
    type: "CODE_BLOCK",
    children,
    lang: "tsx",
    showCopy: true,
    showLines: true,
  };
}

function convertNewLineImpl(
  node: ICodeBlockElement | ICodeBlockText
): ICodeBlockText[] | ICodeBlockElement[] {
  if (node.type === "CODE_BLOCK_TEXT") {
    if (node.text.includes("\n")) {
      return node.text.split("\n").map((line) => {
        const result: ICodeBlockElement = {
          type: "CODE_BLOCK_ELEMENT",
          tagName: "span",
          properties: {
            className: ["token text-wrapper"],
          },
          children: [
            {
              type: "CODE_BLOCK_TEXT",
              text: line,
              isNewline: line === "",
            },
          ],
        };
        return result;
      });
    }
    return [node];
  }

  if (node.type === "CODE_BLOCK_ELEMENT") {
    const children = node.children.map((child) => convertNewLineImpl(child));

    const flattenChildren = children.flat();
    return [
      {
        ...node,
        children: flattenChildren,
      },
    ];
  }

  throw new Error("");
}

function convertNewline(codeBlock: ICodeBlock): ICodeBlock {
  return {
    ...codeBlock,
    children: codeBlock.children
      .map((child) => convertNewLineImpl(child))
      .flat(),
  };
}

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
    const formatted = refractor.highlight(content, "tsx");
    try {
      const converted = refractorRootToCodeBlock(formatted);

      const newlineConverted = convertNewline(converted);

      // 혹시 모를 상황을 위해 얕은 복사 수행
      const copiedPath = [...path];
      Transforms.removeNodes(editor, { at: copiedPath });
      Transforms.insertNodes(editor, newlineConverted, { at: copiedPath });
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
