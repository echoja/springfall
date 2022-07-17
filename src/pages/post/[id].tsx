import { faAxe } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prisma from "@lib/prisma";
import { renderPublic } from "@lib/render";
import { serializePost } from "@lib/serialize";
import type { MonnomlogPage, SerializedPost } from "@modules/content/types";
import { format } from "date-fns";
import Joi from "joi";
import type { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useMemo } from "react";
import type { Descendant } from "slate";

interface IPostViewProps {
  post: SerializedPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
    },
  });
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IPostViewProps> = async ({
  params,
}) => {
  if (typeof params?.id !== "string") {
    throw new Error("id is not string");
  }
  const id = parseInt(params.id, 10);

  const schema = Joi.number().integer().min(1);
  const result = schema.validate(id);
  if (result.error) {
    throw new Error("page number is not valid");
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return { props: { post: serializePost(post) } };
};

const PostView: MonnomlogPage<IPostViewProps> = ({ post }) => {
  const data = useMemo(() => {
    return (post.content ? post.content.data : []) as Descendant[];
  }, [post.content]);

  const rendered = useMemo(() => {
    return renderPublic(data);
  }, [data]);

  return (
    <article>
      <NextSeo title={post.title} />
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
      </header>
      <div className="text-gray-500 mb-7">
        <span className="mr-2 flex-inline">
          <FontAwesomeIcon icon={faAxe} />
        </span>
        <span>{format(new Date(post.updatedAt), "yyyy.MM.dd.")}</span>
      </div>
      <div className="article-body">{rendered}</div>
    </article>
  );
};

export default PostView;
