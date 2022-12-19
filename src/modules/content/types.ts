import type { Post } from "@modules/supabase/supabase";
import type { NextPage } from "next";
import type React from "react";
import type { ReactNode } from "react";
import type { BaseEditor, Descendant, Element } from "slate";
import type {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import type { SetOptional } from "type-fest";
import type { GetState, SetState } from "zustand";

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: "EDITOR" };
    Element: ElementNode;
    Text: InlineNode | EmptyText;
  }
}

export type LayoutWrapper = React.FC<{ children: ReactNode }>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  layoutWrapper?: LayoutWrapper;
};

export type ContentType = { data: Descendant[] };

export type CommonRenderElementProps = SetOptional<
  RenderElementProps,
  "attributes"
> & {
  empty?: boolean;
};

export interface IContentElementProps<T extends Element>
  extends CommonRenderElementProps {
  element: T;
}

export type CreatePostInput = Pick<
  Post,
  "title" | "content" | "published" | "summary"
>;

export type ElementNode = StandaloneElementNode | PartElementNode;

export type StandaloneElementNode =
  | IParagraph
  | IBlockquote
  | IHeading
  | ICodeBlock
  | ICallout
  | IQuote
  | IImageContainer
  | IImageUploadPlaceholder
  | IList
  | IHr
  | ILink
  | IRawHtml
  | ITable;

// types to be used with StandaloneElementNode
export type PartElementNode =
  | IListItem
  | ITableGroup
  | ITableRow
  | ITableCell
  | ICodeLine
  | ICodeElement
  | IImage
  | IImageCaption;

export type IRawHtml = {
  type: "RAW_HTML";
  html: string;
  children: [EmptyText];
};

export type ITable = {
  type: "TABLE";
  children: ITableGroup[];
  header?: boolean;
};

export type ITableGroup = {
  type: "TABLE_GROUP";
  role: "head" | "body" | "foot";
  children: ITableRow[];
};

export type ITableRow = {
  type: "TABLE_ROW";
  children: ITableCell[];
};

export type ITableCell = {
  type: "TABLE_CELL";
  header?: boolean;
  children: StandaloneElementNode[];
};

export type ICallout = {
  type: "CALLOUT";
  colorScheme: "blue" | "green" | "red" | "yellow";
  icon: string;
  children: StandaloneElementNode[];
};

export type IHr = {
  type: "HR";
  children: [EmptyText];
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
  children: StandaloneElementNode[];
};

export type IImage = {
  type: "IMAGE";
  url: string;
  width: number;
  height: number;
  alt?: string;
  children: [EmptyText];
};

export type IImageUploadPlaceholder = {
  type: "IMAGE_UPLOAD_PLACEHOLDER";
  children: [EmptyText];
  id: string;
  src?: string;
};

export type IImageCaption = {
  type: "IMAGE_CAPTION";
  width: number;
  children: InlineNode[];
};

export type IImageContainer = {
  type: "IMAGE_CONTAINER";
  children: [IImage, IImageCaption];
};

export type IQuote = {
  type: "QUOTE";
  children: StandaloneElementNode[];
};

export type Language =
  | "tsx"
  | "rust"
  | "python"
  | "html"
  | "plaintext"
  | "sh"
  | "cpp"
  | "css";

export type ICodeBlock = {
  type: "CODE_BLOCK";
  lang: Language;
  showLines: boolean;
  showCopy: boolean;
  label?: string;
  url?: string;
  children: ICodeLine[];
};

export type ICodeLine = {
  type: "CODE_LINE";
  format?: "info" | "added" | "deleted";
  children: (ICodeElement | IText)[];
};

export type ICodeElement = {
  type: "CODE_ELEMENT";
  tagName: "span";
  properties?: {
    className?: string[];
  };
  children: (ICodeElement | IText)[];
};

export type IParagraph = {
  type: "PARAGRAPH";
  children: InlineNode[];
};

export type IBlockquote = {
  type: "BLOCKQUOTE";
  children: InlineNode[];
};

export type ILink = {
  type: "LINK";
  url: string;
  internal?: boolean;
  children: InlineNode[];
};

type InlineNode = IText;

export type IText = {
  type: "TEXT";
  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  code?: boolean;
  kbd?: boolean;
  cite?: boolean;
};

export type Mark = keyof Omit<IText, "type" | "text">;

export type IPlainText = {
  type: "PLAIN_TEXT";
  text: string;
};

export type EmptyText = IText & {
  text: "";
};

export interface IBaseCommand {
  label: string;
  hiddenLabel?: string;
}

export interface IConvertCommand extends IBaseCommand {
  type: "CONVERT";
  to: Exclude<Element["type"], "HEADING" | "IMAGE_CAPTION">;
}

export interface INoopCommand extends IBaseCommand {
  type: "NOOP";
  label: "noop";
}

export interface IConvertHeadingCommand extends IBaseCommand {
  type: "CONVERT_HEADING";
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ISimpleCommand extends IBaseCommand {
  type: "INSERT_IMAGE" | "INSERT_RAW_HTML";
}

export type Command =
  | IConvertCommand
  | INoopCommand
  | IConvertHeadingCommand
  | ISimpleCommand;

export interface IUploadRequestInfo {
  url: string;
  method: "POST" | "PUT";
  headers: {
    [key: string]: string;
  };
}

export interface IGetUploadUrlParams {
  filename: string;
  filetype: string;
}

export interface IFileManager {
  /**
   *  PresignedUrl 을 활용하여 업로드 링크를 생성합니다.
   *
   *  AWS 사용 시 리턴값 예시
   *  ```json
   *  {
   *    "headers": {
   *      "Policy": "abcde...",
   *      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
   *      "X-Amz-Credential": "AKIAVYN6O3HUQNZ5JQHO/20220508/ap-northeast-2/s3/aws4_request",
   *      "X-Amz-Date": "20220508T132432Z",
   *      "X-Amz-Signature": "834f39e6a07a5344d39722c94c2b0aa3c90d20922674b13ca26c9c5d429e4288",
   *      "acl": "public-read",
   *      "bucket": "monnomlog-test",
   *      "key": "user/eric/1",
   *    },
   *    "method": "POST",
   *    "url": "https://s3.ap-northeast-2.amazonaws.com/monnomlog-test",
   *  }
   *  ```
   */
  getUploadUrl: (params: IGetUploadUrlParams) => Promise<IUploadRequestInfo>;

  getFileInfo: (id: string) => Promise<{
    type: "IMAGE" | "FILE";
    name: string;
    fullUrl: string;
    size: number;
    mimeType: string;
    alt?: string;
  }>;

  removeFile: (
    id: string
  ) => Promise<{ success: true } | { success: false; reason: string }>;
}

export type Merge<P, T> = Omit<P, keyof T> & T;

/** Object 에서 모든 key 타입을 가져옵니다. */
export type Keys<T> = T extends Record<infer K, unknown> ? K : never;

/** Object 에서 key에 따라 해당 Value 타입을 가져옵니다. */
export type ValueOf<T, K extends string | number | symbol> = T extends Record<
  K,
  infer V
>
  ? V
  : never;

export type AdminStore = {
  codeBlockEditPath: number[];
  openCodeBlockEditModal: (path: number[]) => void;
  closeCodeBlockEditModal: () => void;

  isOpenCommandPalette: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  isOpenImageInsertDialog: boolean;
  openImageInsertDialog: () => void;
  closeImageInsertDialog: () => void;

  editingPostInitialized: boolean;
  setEditingPostInitialized: (initialized: boolean) => void;
};

export type SplittedStores = AdminStore;

export type Stores = {
  [Key in Keys<SplittedStores>]: ValueOf<SplittedStores, Key>;
};

export type Set = SetState<Stores>;
export type Get = GetState<Stores>;

export type CommonRenderLeafProps = SetOptional<RenderLeafProps, "attributes">;

export interface IRenderTextProps extends CommonRenderLeafProps {
  leaf: IText;
}
