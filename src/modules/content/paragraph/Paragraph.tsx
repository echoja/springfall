import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IContentElementProps, IParagraph } from "@modules/content/types";

const Paragraph: React.FC<IContentElementProps<IParagraph>> = ({
  attributes,
  children,
}) => {
  const selected = useSelected();

  return (
    <div className={twMerge(selected && "ring-1 ring-offset-8")}>
      <p {...attributes}>{children}</p>
    </div>
  );
};

export default Paragraph;
