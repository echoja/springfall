// TypeScript users only add this code
import {
  Box,
  Divider,
  Flex,
  Heading,
  OrderedList,
  Table,
  Td,
  Th,
  Text as ChakraText,
  UnorderedList,
  chakra,
  Button,
  HStack,
  useOutsideClick,
  Portal,
  VStack,
  Fade,
} from "@chakra-ui/react";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BaseEditor, Descendant, Location } from "slate";
import { createEditor, Editor, Transforms, Text } from "slate";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { ReactEditor, Editable, Slate, withReact } from "slate-react";

const StyledEditable = chakra(Editable);

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
  // const selected = useSelected();
  // const focused = useFocused();

  return (
    <ChakraText
      marginBottom={2}
      transition="ease"
      // borderWidth={1}
      // borderColor={focused && selected ? "gray.200" : "transparent"}
      // shadow={focused && selected ? "xl" : undefined}
      {...attributes}
    >
      {children}
    </ChakraText>
  );
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

export interface IRenderTableProps extends RenderElementProps {
  element: ITable;
}

const TableComponent = (props: IRenderTableProps) => {
  const { attributes, children } = props;
  return (
    <Table {...attributes}>
      <Th>
        <Td>
          <Box>{children}</Box>
        </Td>
      </Th>
    </Table>
  );
};

export interface IRenderHrProps extends RenderElementProps {
  element: IHr;
}

const HrComponent = (props: IRenderHrProps) => {
  const { attributes } = props;
  return <Divider {...attributes} />;
};

export interface IRenderYoutubeProps extends RenderElementProps {
  element: IYoutube;
}

const YoutubeComponent = (props: IRenderYoutubeProps) => {
  const { element, attributes } = props;
  return <div {...attributes}>iframeUrl: {element.iframeUrl}</div>;
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

export type IContentEditorProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

export const ContentEditor: React.FC<IContentEditorProps> = ({
  onChange,
  value,
}) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [contextMenuAnchorPoint, setContextMenuAnchorPoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPath, setContextMenuPath] = useState<Location | null>(null);
  const contextMenuRef = useRef(null);

  const closeContextMenu = useCallback(() => {
    setContextMenuVisible(false);
  }, [setContextMenuVisible]);

  useOutsideClick({
    ref: contextMenuRef,
    handler: closeContextMenu,
  });

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

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const resultEntry = Editor.above<ElementNode>(editor, {
        at: ReactEditor.findEventRange(editor, event),
        match: (n) => Editor.isBlock(editor, n),
      });
      if (resultEntry) {
        setContextMenuAnchorPoint({ x: event.clientX, y: event.clientY });
        setContextMenuVisible(true);
        setContextMenuPath(resultEntry[1]);
      }
    },
    [editor]
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.table(contextMenuAnchorPoint);
  }, [contextMenuAnchorPoint]);

  return (
    <>
      <HStack>
        <Button onClick={() => insertSomeWords(editor)}>썸워드 1</Button>
        <Button onClick={() => insertSomeWords2(editor)}>썸워드 2</Button>
      </HStack>

      <Slate value={value} onChange={onChange} editor={editor}>
        <Box position="relative">
          <StyledEditable
            padding={3}
            borderWidth={1}
            maxWidth={900}
            // borderColor="black"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case "`":
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                  break;

                case "b":
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;

                default:
                  break;
              }
            }}
            onContextMenu={handleContextMenu}
          />
          {contextMenuVisible && (
            <Portal>
              <Fade in={contextMenuVisible}>
                <Box
                  ref={contextMenuRef}
                  // padding={3}
                  shadow="xl"
                  background="white"
                  position="absolute"
                  top={contextMenuAnchorPoint.y}
                  left={contextMenuAnchorPoint.x}
                >
                  <VStack spacing={0} padding={0}>
                    <Button
                      borderRadius={0}
                      bgColor="transparent"
                      onClick={() => {
                        if (contextMenuPath) {
                          Transforms.setNodes<ElementNode>(
                            editor,
                            {
                              type: "CODE_BLOCK",
                            },
                            {
                              at: contextMenuPath,
                            }
                          );
                        }
                      }}
                    >
                      코드블록으로 전환
                    </Button>
                    <Button
                      borderRadius={0}
                      bgColor="transparent"
                      onClick={() => {
                        if (contextMenuPath) {
                          Transforms.setNodes<ElementNode>(
                            editor,
                            {
                              type: "PARAGRAPH",
                            },
                            {
                              at: contextMenuPath,
                            }
                          );
                        }
                      }}
                    >
                      문단으로 전환
                    </Button>
                  </VStack>
                </Box>
              </Fade>
            </Portal>
          )}
        </Box>
      </Slate>
    </>
  );
};

// const getClosestParentElement = (
//   editor: Editor,
//   node: Node
// ): ElementNode | null => {
//   if (!editor.selection) {
//     return null;
//   }

//   const result = Editor.above<ElementNode>(editor, {
//     at: editor.selection,
//     match: (matchingNode) =>
//       matchingNode.type !== "EDITOR" && Editor.isBlock(editor, matchingNode),
//   });

//   if (!result) {
//     return null;
//   }

//   const [resultElement] = result;
//   return resultElement;
// };

// interface IEditorLayoutWrapperProps {}

// const EditorLayoutWrapper: React.FC<IEditorLayoutWrapperProps> = (props) => {
//   return (
//     <Box position="relative" ref={}>
//       {props.children}
//     </Box>
//   );
// };
