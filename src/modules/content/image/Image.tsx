import type { IContentElementProps, IImage } from "@modules/content/types";
import { useMemo } from "react";
import { useFocused, useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

const Image: React.FC<IContentElementProps<IImage>> = ({
  children,
  attributes,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();
  const classes = useMemo(() => {
    return selected && focused ? "ring-indigo-500" : "";
  }, [focused, selected]);

  const style = useMemo(
    () =>
      element.size.type === "FIT"
        ? {}
        : {
            width: element.size.width,
            height: element.size.height,
          },
    [element.size]
  );

  return (
    <div {...attributes}>
      <div contentEditable={false} className="relative">
        <img
          src={element.url}
          alt={element.alt}
          className={twMerge("block max-w-full", classes)}
          style={{ ...style }}
        />
      </div>
      {children}
    </div>
  );
};

export default Image;
