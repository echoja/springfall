import InlineChromiumBugfix from "@modules/editor/components/InlineChromiumBugfix";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { IContentElementProps, ILink } from "../types";

import style from "./style.module.css";

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
      className={twMerge(selected && "ring-2", style.link)}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};

export default Link;
