import remarkCustomContainer from "@echoja/remark-custom-container";
import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import { remarkCodeHike } from "codehike/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: {
    code: "Code",
  },
};

/** @type {import('next').NextConfig} */
const config = {
  /** mdxRS 로 하면 `remarkPlugins` 가 먹히지 않음.  */
  // experimental: {
  //   mdxRs: true,
  // },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/post/12",
        destination: "/article/2023-03/draw-io-auto-layout",
        permanent: true,
      },
      {
        source: "/post/11",
        destination: "/article/2023-02/knou-tips",
        permanent: true,
      },
      {
        source: "/post/10",
        destination: "/article/2023-02/puss-in-boots",
        permanent: true,
      },
      {
        source: "/post/9",
        destination: "/article/2022-11/i-me-mom-mom",
        permanent: true,
      },
      {
        source: "/post/7",
        destination: "/article/2022-11/easy-promise-async-await",
        permanent: true,
      },
      {
        source: "/post/5",
        destination: "/article/2022-10/javascript-smooth-animation",
        permanent: true,
      },
      {
        source: "/post/6",
        destination: "/article/2022-11/everything",
        permanent: true,
      },
      {
        source: "/post/3",
        destination: "/article/2023-07/ts-data-structure",
        permanent: true,
      },
      {
        source: "/post/2",
        destination: "/article/2022-10/hello-sadness",
        permanent: true,
      },
      {
        source: "/post/1",
        destination: "/article/2022-09/company",
        permanent: true,
      },
    ];
  },

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("@echoja/remark-custom-container").CustomContainerOptions } */
const customContainerOptions = {
  optionsByClassName: [
    {
      selector: "details",
      containerTag: "details",
      titleTag: "summary",
    },
  ],
};

const withMDX = mdx({
  options: {
    jsx: true,

    remarkPlugins: [
      [remarkCustomContainer, customContainerOptions],
      remarkGfm,
      [remarkCodeHike, chConfig],
      [remarkToc, { heading: "목차" }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            className: "heading-anchor",
          },
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              className: "icon-link",
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
                },
              },
            ],
          },
        },
      ],
    ],
  },
});

export default withMDX(withBundleAnalyzer(config));
