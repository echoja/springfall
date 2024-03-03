"use client";

import { useColorMode } from "@modules/color-mode/color-mode";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ArticleCounter({
  className,
  url,
}: {
  className?: string;
  url: string;
}) {
  const { colorMode } = useColorMode();

  const imageMap = useRef(new Map<string, HTMLImageElement>());
  const spanRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);

  const color = colorMode === "dark" ? "rgb(156 163 175)" : "rgb(107 114 128)";

  const src = `https://pageview-counter.springfall.workers.dev/api/counter.svg?color=${color}&size=12&url=${encodeURIComponent(url)}`;

  useEffect(() => {
    let image = imageMap.current.get(src);
    if (image) {
      spanRef.current?.insertBefore(image!, spanRef.current?.firstChild);
    } else if (!image) {
      setLoading(true);
      image = new Image();
      image.onload = () => {};
      image.src = src;
      image.alt = "counter";
      image.onload = () => {
        spanRef.current?.insertBefore(image!, spanRef.current?.firstChild);
        setLoading(false);
      };
      imageMap.current.set(src, image);
    }
    return () => {
      image?.parentElement?.removeChild(image);
    };
  }, [src]);

  return (
    <span
      ref={spanRef}
      className={twMerge("flex items-center gap-0.5", className)}
    >
      {loading && <span>--</span>}
      <span>views</span>
    </span>
  );
}
