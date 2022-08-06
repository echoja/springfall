import InlineChromiumBugfix from "@modules/editor/components/InlineChromiumBugfix";

import type { IContentElementProps, ILink } from "../types";

const Link: React.FC<IContentElementProps<ILink>> = ({ children, element }) => {
  return (
    <a href={element.url}>
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};

export default Link;
