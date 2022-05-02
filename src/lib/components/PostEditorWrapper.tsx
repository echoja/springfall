import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ContentType } from "@lib/types";
import type { Post } from "@prisma/client";
import Link from "next/link";
import type React from "react";
import { useEffect, useCallback, useState } from "react";

import { ContentEditor } from "./ContentEditor";

export type PostEditArgs = Pick<Post, "title" | "content">;

interface IPostEditorWrapperProps {
  post: PostEditArgs;
  onChangePost: (post: PostEditArgs) => void;
  onSaveButtonClick: () => void;
}

const PostEditorWrapper: React.FC<IPostEditorWrapperProps> = ({
  post,
  onChangePost,
  onSaveButtonClick,
}) => {
  const [content, setContent] = useState<ContentType>(
    post.content as ContentType
  );
  const [title, setTitle] = useState(post.title);

  const onTitlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  useEffect(() => {
    onChangePost({
      content,
      title,
    });
  }, [content, onChangePost, title]);

  return (
    <div>
      <div className="p-2 shadow-md mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/post/list">
              <a className="btn mr-2">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </Link>
            <span className="font-semibold">글 편집</span>
          </div>

          <button type="button" className="btn" onClick={onSaveButtonClick}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>

      {/* 목차 사이드바 */}
      <div>
        <input
          type="text"
          value={title}
          onChange={onTitlechange}
          className="norder-0 text-xl font-semibold mb-3"
        />
        <ContentEditor
          value={content.data}
          onChange={(value) => {
            setContent({ data: value });
          }}
        />
      </div>
    </div>
  );
};

export default PostEditorWrapper;
