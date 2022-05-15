import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combobox, Dialog } from "@headlessui/react";
import useConst from "@lib/hooks/use-const";
import { getDefaultNodeProps } from "@lib/node";
import { useMyStoreWithMemoizedSelector } from "@lib/store";
import type { Command, ElementNode } from "@lib/types";
import { useCallback, useState, memo } from "react";
import type { Element } from "slate";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { twMerge } from "tailwind-merge";

const commands: Command[] = [
  {
    type: "CONVERT",
    to: "CALLOUT",
    label: "콜아웃으로 변환 (개발중)",
    hiddenLabel: "convert to callout",
  },
  {
    type: "CONVERT",
    to: "CODE_BLOCK",
    label: "코드블럭으로 변환 (개발중)",
    hiddenLabel: "convert to codeblock",
  },
  {
    type: "CONVERT",
    to: "GITHUB_BLOCK",
    label: "깃허브 블록으로 변환 (개발중)",
    hiddenLabel: "convert to githubblock",
  },
  {
    type: "CONVERT_HEADING",
    level: 1,
    label: "h1 제목으로 변환",
    hiddenLabel: "convert to h1",
  },
  {
    type: "CONVERT_HEADING",
    level: 2,
    label: "h2 제목으로 변환",
    hiddenLabel: "convert to h2",
  },
  {
    type: "CONVERT_HEADING",
    level: 3,
    label: "h3 제목으로 변환",
    hiddenLabel: "convert to h3",
  },
  {
    type: "CONVERT_HEADING",
    level: 4,
    label: "h4 제목으로 변환",
    hiddenLabel: "convert to h4",
  },
  {
    type: "CONVERT_HEADING",
    level: 5,
    label: "h5 제목으로 변환",
    hiddenLabel: "convert to h5",
  },
  {
    type: "CONVERT_HEADING",
    level: 6,
    label: "h6 제목으로 변환",
    hiddenLabel: "convert to h6",
  },
  {
    type: "CONVERT",
    to: "HR",
    label: "가로선으로 변환 (개발중)",
    hiddenLabel: "convert to hr",
  },
  {
    type: "CONVERT",
    to: "LIST",
    label: "리스트로 변환 (개발중)",
    hiddenLabel: "convert to list",
  },
  {
    type: "CONVERT",
    to: "PARAGRAPH",
    label: "문단으로 변환 (개발중)",
    hiddenLabel: "convert to paragraph",
  },
  {
    type: "CONVERT",
    to: "QUOTE",
    label: "인용구로 변환 (개발중)",
    hiddenLabel: "convert to quote",
  },
  {
    type: "CONVERT",
    to: "TABLE",
    label: "표로 변환 (개발중)",
    hiddenLabel: "convert to table",
  },
  {
    type: "CONVERT",
    to: "YOUTUBE",
    label: "유튜브 블록으로 변환 (개발중)",
    hiddenLabel: "convert to youtube",
  },
  {
    type: "INSERT_IMAGE",
    label: "이미지 삽입",
    hiddenLabel: "insert image",
  },
];

interface ICommandPaletteProps {
  onCommand?: (command: Command) => void;
}

const CommandPalette: React.FC<ICommandPaletteProps> = ({ onCommand }) => {
  const [query, setQuery] = useState("");
  const editor = useSlate();
  const { isOpen, close } = useMyStoreWithMemoizedSelector((store) => {
    return {
      isOpen: store.isOpenCommandPalette,
      close: store.closeCommandPalette,
    };
  }, []);

  const initialCommand = useConst<Command>({
    type: "NOOP",
    label: "noop",
  });

  // TODO: FZF 적용
  const filteredCommand =
    query === ""
      ? commands
      : commands.filter((command) => {
          return `${command.label} | ${
            command.hiddenLabel ? command.hiddenLabel : ""
          }`
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  const onSelected = useCallback(
    (command: Command) => {
      switch (command.type) {
        case "CONVERT": {
          const resultEntry = Editor.above<ElementNode>(editor, {
            at: editor.selection?.anchor,
            match: (n) => Editor.isBlock(editor, n),
          });

          if (resultEntry) {
            const [node, path] = resultEntry;
            Transforms.setNodes<Element>(
              editor,
              {
                // 기본값
                ...getDefaultNodeProps(command.to),

                // // 본래 노드가 가지고 있던 값
                ...(node as Omit<Partial<Element>, "type" | "children">),

                // 변경되는 타입
                type: command.to,
              },
              { at: path }
            );
          }
          break;
        }
        case "CONVERT_HEADING": {
          const resultEntry = Editor.above<ElementNode>(editor, {
            at: editor.selection?.anchor,
            match: (n) => Editor.isBlock(editor, n),
          });
          if (resultEntry) {
            Transforms.setNodes(
              editor,
              { type: "HEADING", level: command.level },
              { at: resultEntry[1] }
            );
          }
          break;
        }
        default: {
          onCommand?.(command);
        }
      }
      close();
      setQuery("");
    },
    [editor, onCommand, close]
  );

  return (
    <Dialog as="div" className="relative z-10" onClose={close} open={isOpen}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
          <Combobox value={initialCommand} onChange={onSelected}>
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute top-4 left-4 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm font-sans"
                placeholder="Search..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {filteredCommand.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {filteredCommand.map((command) => (
                  <Combobox.Option
                    key={command.label}
                    value={command}
                    className={({ active }) =>
                      twMerge(
                        "cursor-default select-none px-4 py-2 font-sans",
                        active && "bg-brand-600 text-white"
                      )
                    }
                  >
                    {command.label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query !== "" && filteredCommand.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No people found.</p>
            )}
          </Combobox>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default memo(CommandPalette);
