import type { MDXComponents } from "mdx/types";

import {
  Anchor,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "@modules/article/formats";
import {
  ListItem,
  OrderedList,
  UnorderdList,
} from "@modules/article/list-components";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
// eslint-disable-next-line import/prefer-default-export
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    ol: OrderedList,
    ul: UnorderdList,
    code: Code,
    a: Anchor,
    li: ListItem,
    ...components,
  };
}
