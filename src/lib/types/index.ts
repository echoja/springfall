import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import type { DefaultSession } from "next-auth";
import type { ReactElement, ReactNode } from "react";
import type { BaseEditor, Descendant, Element } from "slate";
import type { ReactEditor, RenderElementProps } from "slate-react";
import type { SetOptional } from "type-fest";

export * from "./merge";

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: "EDITOR" };
    Element: ElementNode;
    Text: InlineNode;
  }
}

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  layoutWrapper?: (page: ReactElement) => ReactNode;
};

export type ContentType = { data: Descendant[] };

export type RenderPublicElementProps = SetOptional<
  RenderElementProps,
  "attributes"
>;

export type PublicElementComponent<T extends RenderElementProps> = React.FC<
  SetOptional<T, "attributes">
>;

export type SerializedPost = Omit<
  Post,
  "updatedAt" | "createdAt" | "content"
> & {
  updatedAt: string;
  createdAt: string;
  content: ContentType;
};

export type CreatePostInput = Omit<
  Post,
  "content" | "createdAt" | "updatedAt" | "id"
> & {
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

export interface IBaseCommand {
  label: string;
  hiddenLabel?: string;
}

export interface IConvertCommand extends IBaseCommand {
  type: "CONVERT";
  to: Exclude<Element["type"], "HEADING">;
}

export interface INoopCommand extends IBaseCommand {
  type: "NOOP";
  label: "noop";
}

export interface IConvertHeadingCommand extends IBaseCommand {
  type: "CONVERT_HEADING";
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export type Command = IConvertCommand | INoopCommand | IConvertHeadingCommand;
