"use client";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface IQuote {
  type: "quote";
  text: string;
  source: string;
}

interface IImage {
  type: "image";
  src: string;
  width: number;
  height: number;
}

interface IParagraph {
  type: "paragraph";
  text: string;
}

type Content = IQuote | IImage | IParagraph;

interface IPost {
  title: string;
  createdAt: Dayjs;
  modifiedAt: Dayjs;
  contents: Content[];
}

interface IPostUntrusted {
  title?: string;
  createdAt?: string;
  modifiedAt?: string;
  contents?: Partial<Content>[];
}

function createPost(postUntrusted: IPostUntrusted = {}): IPost {
  return {
    title: "",
    ...postUntrusted,
    modifiedAt: dayjs(postUntrusted.modifiedAt),
    createdAt: dayjs(postUntrusted.createdAt),
    contents: postUntrusted.contents
      ? postUntrusted.contents.map(createContent)
      : [],
  };
}

function createContent(content: Partial<Content> = {}): Content {
  switch (content?.type) {
    case "quote":
      return createQuote(content);
    case "image":
      return createImage(content);
    case "paragraph":
      return createParagraph(content);
    case undefined:
    default:
      throw new Error("Invalid content type");
  }
}

function createQuote(content: Partial<IQuote> = {}): IQuote {
  return {
    text: "",
    source: "",
    ...content,
    type: "quote",
  };
}

function createImage(content: Partial<IImage> = {}): IImage {
  return {
    src: "",
    width: 0,
    height: 0,
    ...content,
    type: "image",
  };
}

function createParagraph(content: Partial<IParagraph> = {}): IParagraph {
  return {
    text: "",
    ...content,
    type: "paragraph",
  };
}

function render(content: Content) {
  switch (content.type) {
    case "quote":
      return renderQuote(content);
    case "image":
      return renderImage(content);
    case "paragraph":
      return renderParagraph(content);
  }
}

function renderQuote(content: IQuote) {
  return (
    <blockquote>
      <p>{content.text}</p>
      <cite>{content.source}</cite>
    </blockquote>
  );
}

function renderImage(content: IImage) {
  return (
    <img
      src={content.src}
      width={content.width}
      height={content.height}
      alt=""
    />
  );
}

function renderParagraph(content: IParagraph) {
  return <p>{content.text}</p>;
}

export const Post: React.FC<{
  post: IPost;
}> = ({ post }) => {
  const { createdAt, contents, modifiedAt, title } = post;
  return (
    <article>
      <div>제목: {title}</div>
      <div>생성일: {createdAt.format("YYYY-MM-DD")}</div>
      <div>수정일: {modifiedAt.format("YYYY-MM-DD")}</div>
      {contents.map((content) => render(content))}
    </article>
  );
};

export const PostPage: React.FC = () => {
  const [post, setPost] = useState<IPost>(createPost());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/api/post/1");
        // const json = (await response.json()) as IPostUntrusted;
        const json = (await import("./test.json")) as IPostUntrusted;
        const post = createPost(json);
        setPost(post);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Post post={post} />
      <button>리스트로...</button>
    </div>
  );
};
