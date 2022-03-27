// TypeScript users only add this code
import {
  Box,
  Flex,
  Heading,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import type { BaseEditor, Descendant } from "slate";
import { createEditor, Editor, Transforms, Text } from "slate";
import type {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { Editable, Slate, withReact } from "slate-react";

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "TEXT" && n.bold === true,
      universal: true,
    });

    return Boolean(match);
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "CODE_BLOCK",
    });

    return Boolean(match);
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "CODE_BLOCK" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

type ElementNode =
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

export interface ICallout {
  type: "CALLOUT";
  colorScheme: "blue" | "green" | "red" | "yellow";
  icon: string;
  children: ElementNode[];
}

export interface IHr {
  type: "HR";
}

export interface IYoutube {
  type: "YOUTUBE";
  iframeUrl: string;
}

export interface ITable {
  type: "TABLE";
  // TODO: 구현 필요
}

export interface IHeading {
  type: "HEADING";
  children: InlineNode[];
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface IList {
  type: "LIST";
  children: IListItem[];
  ordered: boolean;
}

export interface IListItem {
  type: "LIST_ITEM";
  children: ElementNode[];
}

export interface IImage {
  type: "IMAGE";
  id: string;
  caption?: IParagraph;
  alt?: string;
}

export interface IQuote {
  type: "QUOTE";
  children: ElementNode[];
}

export interface ICodeBlock {
  type: "CODE_BLOCK";
  lang: string;
  children: CodeBlockChild[];
}

export type CodeBlockChild = IParagraph | ICodeExplainer;

export interface ICodeExplainer {
  line: number;
  children: ElementNode[];
}

interface IParagraph {
  type: "PARAGRAPH";
  children: InlineNode[];
}

export interface IGithubBlock {
  type: "GITHUB_BLOCK";
  url: string;
}

type InlineNode = IText | ILink | IIcon;

export interface IText {
  type: "TEXT";
  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  kbd?: boolean;
}

export interface ILink {
  type: "LINK";
  text: string;
  url: string;
  internal?: boolean;
}

export interface IIcon {
  type: "ICON";
  icon: string;
}

export interface ICodeBlockComponentProps extends RenderElementProps {
  lang?: string;
}

const CodeBlockComponent = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

const ParagraphComponent = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return <p {...attributes}>{children}</p>;
};

export interface IRenderHeadingProps extends RenderElementProps {
  element: IHeading;
}

const HeadingComponent = (props: IRenderHeadingProps) => {
  const { attributes, children, element } = props;
  return (
    <Heading as={`h${element.level}`} {...attributes}>
      {children}
    </Heading>
  );
};

export interface IRenderListProps extends RenderElementProps {
  element: IList;
}

const ListComponent = (props: IRenderListProps) => {
  const { element, attributes, children } = props;
  if (element.ordered) {
    return <OrderedList {...attributes}>{children}</OrderedList>;
  }
  return <UnorderedList {...attributes}>{children}</UnorderedList>;
};

export interface IRenderCalloutProps extends RenderElementProps {
  element: ICallout;
}

const CalloutComponent = (props: IRenderCalloutProps) => {
  const { element, attributes, children } = props;
  return (
    <Flex {...attributes}>
      <Box>icon: {element.icon}</Box>
      <Box>{children}</Box>
    </Flex>
  );
};

// Define a React component to render leaves with bold text.
const Leaf = (props: RenderLeafProps) => {
  let { children } = props;
  const { attributes, leaf } = props;

  if (leaf.type === "TEXT") {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.kbd) {
      children = <kbd>{children}</kbd>;
    }

    if (leaf.strikethrough) {
      children = <s>{children}</s>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }
  } else if (leaf.type === "ICON") {
    children = <span>아이콘: {leaf.icon}</span>;
  } else if (leaf.type === "LINK") {
    children = (
      <a
        href={leaf.url}
        target={leaf.internal ? undefined : "_blank"}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
};

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: "EDITOR" };
    Element: ElementNode;
    Text: InlineNode;
  }
}

function insertSomeWords(editor: Editor) {
  Transforms.insertText(editor, "some words", {
    at: {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 3 },
    },
  });
}
function insertSomeWords2(editor: Editor) {
  Transforms.insertText(editor, "some words", {
    at: {
      path: [0, 0],
      offset: 0,
    },
  });
}

export const SlateApp = () => {
  const initialValue: ElementNode[] = [
    {
      type: "PARAGRAPH",
      children: [{ type: "TEXT", text: "A line of text in a paragraph." }],
    },
  ];
  const [editor] = useState(() => withReact(createEditor()));

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback((props: RenderElementProps) => {
    const { element } = props;
    switch (element.type) {
      case "CODE_BLOCK":
        return <CodeBlockComponent {...props} element={element} />;
      case "PARAGRAPH":
        return <ParagraphComponent {...props} element={element} />;
      case "HEADING":
        return <HeadingComponent {...props} element={element} />;
      case "LIST":
        return <ListComponent {...props} element={element} />;
      case "CALLOUT":
        return <CalloutComponent {...props} element={element} />;
      case "TABLE":
        return <TableComponent {...props} element={element} />;
      case "HR":
        return <HrComponent {...props} element={element} />;
      case "YOUTUBE":
        return <YoutubeComponent {...props} element={element} />;
      default:
        return <ParagraphComponent {...props} element={element} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <button onClick={() => insertSomeWords(editor)}>썸워드</button>
        <button onClick={() => insertSomeWords2(editor)}>썸워드2</button>
      </div>

      <Slate value={value} onChange={setValue} editor={editor}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "`": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }

              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
            }
          }}
        />
      </Slate>
    </>
  );
};
