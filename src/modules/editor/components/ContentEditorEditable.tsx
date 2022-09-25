import { renderElement, renderLeaf } from "@modules/content/render";
import type { KeyboardEvent } from "react";
import { useMemo, useCallback, memo } from "react";
import { Editable, useSlateStatic } from "slate-react";
import { twMerge } from "tailwind-merge";

import onKeyDown from "../on-key-down";
import renderPlaceholder from "../render-placeholder";

const ContentEditorEditable: React.FC = () => {
  const editor = useSlateStatic();

  const onHandleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown(event, editor);
    },
    [editor]
  );

  const className = useMemo(
    () => twMerge("p-4 sm:p-6 md:p-8 min-h-[80vh]"),
    []
  );

  return (
    <Editable
      className={className}
      placeholder="내용을 입력하세요"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      renderPlaceholder={renderPlaceholder}
      onKeyDown={onHandleKeyDown}
    />
  );
};

export default memo(ContentEditorEditable);
