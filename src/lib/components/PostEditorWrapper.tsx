import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHotkeys } from "@lib/hooks/use-hotkeys";
import type { SerializedPost } from "@lib/types";
import Link from "next/link";
import type React from "react";
import { useCallback, useState, useMemo, memo } from "react";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import { withReact, Slate } from "slate-react";
import { twMerge } from "tailwind-merge";

import CommandPalette from "./CommandPalette";
import ContentEditorEditable from "./ContentEditorEditable";
import SwitchGroup from "./SwitchGroup";

interface IPostEditorWrapperProps {
  post: SerializedPost;
  onChangePost: (post: SerializedPost) => void;
  onSaveButtonClick: () => void;
}

const PostEditorWrapper: React.FC<IPostEditorWrapperProps> = ({
  post,
  onChangePost,
  onSaveButtonClick,
}) => {
  const setTitle = useCallback(
    (title: string) => {
      onChangePost({ ...post, title });
    },
    [onChangePost, post]
  );

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const onPublishedChange = useCallback(
    (published: boolean) => {
      onChangePost({ ...post, published });
    },
    [onChangePost, post]
  );

  const [editor] = useState(() => withReact(createEditor()));
  const [openCmdPalette, setOpenCmdPalette] = useState(false);
  const [tabs, setTabs] = useState([
    { label: "글", id: "post", current: true },
    { label: "블록", id: "block", current: false },
  ]);

  const currentTabId = useMemo(() => {
    return tabs.find((tab) => tab.current)?.id;
  }, [tabs]);

  const cmdPaletteShortcutHandler = useCallback(() => {
    // eslint-disable-next-line no-console
    setOpenCmdPalette(true);
  }, []);

  useHotkeys({
    keys: "ctrl+shift+p, cmd+shift+p",
    callback: cmdPaletteShortcutHandler,
  });

  useHotkeys({
    keys: "ctrl+s, cmd+s",
    callback: onSaveButtonClick,
  });

  const onSlateChange = useCallback(
    (data: Descendant[]) => {
      onChangePost({ ...post, content: { data } });
    },
    [onChangePost, post]
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

  return (
    <div>
      <div className="p-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/post/list">
              <a className="btn mr-2">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </Link>
            <span className="font-semibold font-sans">글 편집</span>
          </div>

          <button type="button" className="btn" onClick={onSaveButtonClick}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>
      {/* Editor Body */}
      <Slate
        value={post.content?.data}
        onChange={onSlateChange}
        editor={editor}
      >
        <div className="flex gap-2 items-stretch">
          {/* Editor Main */}
          <div className="w-full max-w-screen-lg p-2 mt-6">
            <input
              type="text"
              placeholder="제목"
              value={post.title}
              onChange={onTitlechange}
              className="border-0 text-xl font-semibold mb-3 w-full focus:ring-0"
            />
            <CommandPalette open={openCmdPalette} setOpen={setOpenCmdPalette} />
            <div className="relative">
              <ContentEditorEditable />
            </div>
          </div>

          {/* Editor Sidebar */}
          <div className="border flex-auto">
            {/* Editor Sidebar Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabLinks}
              </nav>
            </div>

            {/* Editor Sidebar Tabs Bocy */}
            <div className="p-3">
              {currentTabId === "post" && (
                <SwitchGroup
                  checked={post.published}
                  onChange={onPublishedChange}
                  title="공개"
                />
              )}
            </div>
          </div>
        </div>
      </Slate>
    </div>
  );
};

export default memo(PostEditorWrapper);
