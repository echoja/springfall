import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import type { BaseEditor, Descendant } from "slate";
import type { ReactEditor } from "slate-react";

export * from "./merge";

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: "EDITOR" };
    Element: ElementNode;
    Text: InlineNode;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  layoutWrapper?: (page: ReactElement) => ReactNode;
};

export type ContentType = { data: Descendant[] };

export type SerializedPost = Omit<
  Post,
  "updatedAt" | "createdAt" | "content"
> & {
  updatedAt: string;
  createdAt: string;
  content: ContentType;
};

export type ElementNode =
  | IParagraph
  | IHeading
  | ICodeBlock
  | ITable
  | ICallout
  | IGithubBlock
  | IQuote
  | IImage
  | IList
  | IHr
  | IYoutube;

export type ICallout = {
  type: "CALLOUT";
  colorScheme: "blue" | "green" | "red" | "yellow";
  icon: string;
  children: ElementNode[];
};

export type IHr = {
  type: "HR";
};

export type IYoutube = {
  type: "YOUTUBE";
  iframeUrl: string;
};

export type ITable = {
  type: "TABLE";
  // TODO: 구현 필요
};

export type IHeading = {
  type: "HEADING";
  children: InlineNode[];
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type IList = {
  type: "LIST";
  children: IListItem[];
  ordered: boolean;
};

export type IListItem = {
  type: "LIST_ITEM";
  children: ElementNode[];
};

export type IImage = {
  type: "IMAGE";
  id: string;
  caption?: IParagraph;
  alt?: string;
};

export type IQuote = {
  type: "QUOTE";
  children: ElementNode[];
};

export type ICodeBlock = {
  type: "CODE_BLOCK";
  lang: string;
  children: CodeBlockChild[];
};

export type CodeBlockChild = IParagraph | ICodeExplainer;

export type ICodeExplainer = {
  line: number;
  children: ElementNode[];
};

export type IParagraph = {
  type: "PARAGRAPH";
  children: InlineNode[];
};

export type IGithubBlock = {
  type: "GITHUB_BLOCK";
  url: string;
};

type InlineNode = IText | ILink | IIcon;

export type IText = {
  type: "TEXT";
  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  kbd?: boolean;
};

export type ILink = {
  type: "LINK";
  text: string;
  url: string;
  internal?: boolean;
};

export type IIcon = {
  type: "ICON";
  icon: string;
};
