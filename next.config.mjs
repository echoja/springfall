import { remarkCodeHike } from "@code-hike/mdx";
import remarkCustomContainer from "@echoja/remark-custom-container";
import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const config = {
  /** mdxRS 로 하면 `remarkPlugins` 가 먹히지 않음.  */
  // experimental: {
  //   mdxRs: true,
  // },

  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
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
    remarkPlugins: [
      [remarkCustomContainer, customContainerOptions],
      remarkGfm,
      [
        remarkCodeHike,
        {
          lineNumbers: false,
          showCopyButton: true,
          theme: "nord",
          skipLanguages: ["mermaid"],
          staticMediaQuery: "not screen, (max-width: 768px)",
          autoImport: true,
          autoLink: false,
        },
      ],
    ],
  },
});

export default withMDX(withBundleAnalyzer(config));
