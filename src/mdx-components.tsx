import type { MDXComponents } from "mdx/types";

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
    h2: ({ children }) => (
      <h2 className="font-semibold mt-[1.5em] mb-[0.5em] text-2xl">
        {children}
      </h2>
    ),
    ...components,
  };
}
