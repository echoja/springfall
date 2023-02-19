import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IBlockquote, IContentElementProps } from "@modules/content/types";

const Blockquote: React.FC<IContentElementProps<IBlockquote>> = ({
  attributes,
  children,
}) => {
  const selected = useSelected();

  return (
    <div className={twMerge(selected && "ring-1 ring-offset-8")}>
      <blockquote {...attributes}>{children}</blockquote>
    </div>
  );
};

export default Blockquote;
