import InlineChromiumBugfix from "@modules/editor/components/InlineChromiumBugfix";

import type { IContentElementProps, ILink } from "../types";

import style from "./style.module.css";

const Link: React.FC<IContentElementProps<ILink>> = ({ children, element }) => {
  return (
    <a href={element.url} className={style.link}>
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};

export default Link;
