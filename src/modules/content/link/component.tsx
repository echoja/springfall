import InlineChromiumBugfix from "@modules/editor/components/InlineChromiumBugfix";
import { createElementComponent } from "@modules/editor/custom-slate-editor";
import { useSelected } from "slate-react";
import { twMerge } from "tailwind-merge";

import type { CommonRenderElementProps, ILink } from "../types";

export interface ILinkProps extends CommonRenderElementProps {
  element: ILink;
}

const { EditorComponent: Link, PublicComponent } =
  createElementComponent<ILinkProps>(({ children, element, attributes }) => {
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
  });

export const PublicLink = PublicComponent;

export default Link;
