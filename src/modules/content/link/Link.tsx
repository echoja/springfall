import InlineChromiumBugfix from "@modules/editor/components/InlineChromiumBugfix";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IContentElementProps, ILink } from "../types";

const Link: React.FC<IContentElementProps<ILink>> = ({
  children,
  element,
  attributes,
}) => {
  const selected = useSelected();
  return (
    <a
      {...attributes}
      href={element.url}
      className={twMerge(selected && "shadow-md")}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};

export default Link;
