import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IContentElementProps, IRawHtml } from "@modules/content/types";

const Html: React.FC<IContentElementProps<IRawHtml>> = ({
  attributes,
  element,
  children,
}) => {
  const selected = useSelected();

  return (
    <div
      className={twMerge(
        "flex items-center justify-center w-full p-10 text-sm bg-slate-100",
        selected && "ring"
      )}
      {...attributes}
    >
      {children}
      {element.html}
    </div>
  );
};

export default Html;
