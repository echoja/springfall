"use client";

import { useEffect, useRef, useState } from "react";

/** @lintignore */
export type ExpandableTextProps = {
  content: string;
  lineClamp?: number;
};

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  content,
  lineClamp = 2,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const [expanding, setExpanding] = useState(false);
  const originalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!pRef.current) {
        return;
      }
      setLineHeight(parseFloat(getComputedStyle(pRef.current).lineHeight));
    });

    if (pRef.current) {
      observer.observe(pRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const maxHeight = lineHeight ? lineHeight * lineClamp : undefined;

  const isOverflown =
    originalRef.current?.scrollHeight &&
    maxHeight &&
    originalRef.current?.scrollHeight > maxHeight;

  return (
    <>
      <p className="relative m-0 h-0 overflow-hidden" ref={originalRef}>
        {content}
      </p>

      <p
        ref={pRef}
        className="relative overflow-hidden"
        style={{ maxHeight: expanding ? undefined : maxHeight }}
      >
        {content}
        {!isOverflown ? null : !expanding ? (
          <button
            className="text-primary absolute right-0 bottom-0 z-1 block cursor-pointer bg-gradient-to-r from-transparent via-white via-40% to-white pl-8 hover:underline dark:via-gray-900 dark:to-gray-900"
            onClick={(e) => {
              e.stopPropagation();
              setExpanding((prev) => !prev);
            }}
            ref={buttonRef}
          >
            더보기
          </button>
        ) : (
          <button
            className="text-primary ml-0.5 cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setExpanding((prev) => !prev);
            }}
          >
            접기
          </button>
        )}
      </p>
    </>
  );
};
