import { isDevelopment } from "@common/config";
import { useHotkeys } from "@common/hooks/use-hotkeys";
import {
  editingPostAtom,
  editingPostContentDataAtom,
  useMyStoreMemo,
} from "@common/store";
import PropertyPanelWrapper from "@modules/admin-ui/property-panel/PropertyPanelWrapper";
import CodeBlockEditModal from "@modules/content/code-block/CodeBlockEditModal";
import {
  insertLink,
  isLinkActive,
  unwrapLink,
} from "@modules/content/link/api";
import type { Command } from "@modules/content/types";
import CommandPalette from "@modules/editor/components/CommandPalette";
import InsertImageDialog from "@modules/editor/components/InsertImageDialog";
import { getEditor } from "@modules/editor/custom-slate-editor";
import FaSolidAngleLeft from "@modules/icons/FaSolidAngleLeft";
import FaSolidFloppyDisk from "@modules/icons/FaSolidFloppyDisk";
import { useAtom } from "jotai";
import Link from "next/link";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import type { Descendant, Selection } from "slate";
import { Slate } from "slate-react";
import { twMerge } from "tailwind-merge";

import ContentEditorEditable from "./ContentEditorEditable";
import DebugPopover from "./DebugPopover";
import PostPropertyPanel from "./PostPropertyPanel";

interface IPostEditorWrapperProps {
  onSaveButtonClick: () => void;
}

const PostEditorWrapper: React.FC<IPostEditorWrapperProps> = ({
  onSaveButtonClick,
}) => {
  const { openCmdPallete, openImageDialog, initialized, setInitialized } =
    useMyStoreMemo((store) => {
      return {
        openCmdPallete: store.openCommandPalette,
        openImageDialog: store.openImageInsertDialog,
        initialized: store.editingPostInitialized,
        setInitialized: store.setEditingPostInitialized,
      };
    }, []);

  const [editingPost, setEditingPost] = useAtom(editingPostAtom);
  const [postContentData] = useAtom(editingPostContentDataAtom);

  const setTitle = useCallback(
    (title: string) => {
      setEditingPost({ ...editingPost, title });
    },
    [setEditingPost, editingPost]
  );

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  useEffect(() => {
    setInitialized(true);
    return () => {
      setInitialized(false);
    };
  }, [setInitialized]);

  const [editor] = useState(getEditor);
  const [savedSelection, setSavedSelection] = useState<Selection | null>(null);
  const [tabs, setTabs] = useState([
    { label: "블록", id: "block", current: true },
    { label: "글", id: "post", current: false },
  ]);

  const currentTabId = useMemo(() => {
    return tabs.find((tab) => tab.current)?.id;
  }, [tabs]);

  const cmdPaletteShortcutHandler = useCallback(() => {
    setSavedSelection(editor.selection);
    openCmdPallete();
  }, [editor.selection, openCmdPallete]);

  useHotkeys({
    keys: "ctrl+shift+p, cmd+shift+p",
    callback: cmdPaletteShortcutHandler,
  });

  useHotkeys({
    keys: "ctrl+s, cmd+s",
    callback: onSaveButtonClick,
  });

  const toggleLink = useCallback(() => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
      return;
    }

    // eslint-disable-next-line no-alert
    const url = window.prompt("Enter the URL of the link:");
    if (!url) {
      return;
    }
    insertLink(editor, url);
  }, [editor]);

  useHotkeys({
    keys: "ctrl+k, cmd+k",
    callback: toggleLink,
  });

  const onSlateChange = useCallback(
    (data: Descendant[]) => {
      setEditingPost((prev) => ({ ...prev, content: { data } }));
    },
    [setEditingPost]
  );

  const tabLinks = useMemo(() => {
    return tabs.map((tab) => (
      <button
        type="button"
        key={tab.label}
        onClick={() => {
          setTabs((prevTabs) =>
            prevTabs.map((t) => {
              if (t.id === tab.id) {
                return { ...t, current: true };
              }
              return { ...t, current: false };
            })
          );
        }}
        className={twMerge(
          tab.current
            ? "border-brand-500 text-brand-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
          "whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm font-sans"
        )}
        aria-current={tab.current ? "page" : undefined}
      >
        {tab.label}
      </button>
    ));
  }, [tabs]);

  const onCommand = useCallback(
    (command: Command) => {
      // eslint-disable-next-line sonarjs/no-small-switch
      switch (command.type) {
        case "INSERT_IMAGE": {
          openImageDialog();
          break;
        }

        default:
          break;
      }
    },
    [openImageDialog]
  );

  return (
    <div>
      {initialized && (
        <Slate value={postContentData} onChange={onSlateChange} editor={editor}>
          <div className="p-2 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/admin/post/list/1" className="mr-2 btn">
                  <FaSolidAngleLeft className="w-4 h-4" />
                </Link>
                <span className="inline-flex pr-2 font-sans font-semibold">
                  글 편집
                </span>
                <span className="text-xs text-gray-500">
                  <kbd>⌘</kbd> (또는 <kbd>Ctrl</kbd>) + <kbd>⇧</kbd> +{" "}
                  <kbd>P</kbd>로 Command Palette 를 여세요!
                </span>
              </div>

              <div className="inline-flex items-center">
                {isDevelopment() && <DebugPopover post={editingPost} />}
                <button
                  type="button"
                  className="btn"
                  onClick={onSaveButtonClick}
                >
                  <FaSolidFloppyDisk className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Editor Body */}

          <CommandPalette onCommand={onCommand} />

          <InsertImageDialog selection={savedSelection} />

          <CodeBlockEditModal />

          <div className="flex items-stretch gap-2">
            {/* Editor Main */}
            <article className="w-full max-w-screen-md mt-6">
              <input
                type="text"
                placeholder="제목"
                value={editingPost.title}
                onChange={onTitlechange}
                className="w-full p-4 mb-3 font-sans text-3xl font-semibold border-0 sm:p-6 md:p-8 focus:ring-0"
              />

              <div className="relative">
                <ContentEditorEditable />
              </div>
            </article>

            {/* Editor Sidebar */}
            <div className="flex-none min-w-[20rem] border-l">
              <div className="sticky top-0 max-h-screen overflow-auto">
                {/* Editor Sidebar Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px" aria-label="Tabs">
                    {tabLinks}
                  </nav>
                </div>

                {/* Editor Sidebar Tabs Body */}
                <div className="p-3">
                  {currentTabId === "post" && <PostPropertyPanel />}
                  {currentTabId === "block" && <PropertyPanelWrapper />}
                </div>
              </div>
            </div>
          </div>
        </Slate>
      )}
    </div>
  );
};

export default memo(PostEditorWrapper);
