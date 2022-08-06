import type { IContentElementProps, IImage } from "@modules/content/types";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const PublicImage: React.FC<IContentElementProps<IImage>> = ({
  children,
  element,
}) => {
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
    <div>
      <div contentEditable={false} className="relative">
        <img
          src={element.url}
          alt={element.alt}
          className={twMerge("block max-w-full")}
          style={{ ...style }}
        />
      </div>
      {children}
    </div>
  );
};

export default PublicImage;
