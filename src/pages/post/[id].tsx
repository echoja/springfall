import { faAxe } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { renderPublic } from "@modules/content/renderPublic";
import type { MonnomlogPage } from "@modules/content/types";
import type { Post } from "@modules/supabase/supabase";
import { servicePosts } from "@modules/supabase/supabase-service";
import { format } from "date-fns";
import Joi from "joi";
import type { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface IPostViewProps {
  post?: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await servicePosts()
    .select("id")
    .eq("published", true);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      paths: [],
      fallback: false,
    };
  }

  if (!data) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = data.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
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

  const { data: post } = await servicePosts()
    .select("*")
    .eq("published", true)
    .eq("id", id)
    .single();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return { props: { post } };
};

const PostView: MonnomlogPage<IPostViewProps> = ({ post }) => {
  const router = useRouter();

  const data = useMemo(() => {
    return post?.content ? post?.content.data : [];
  }, [post?.content]);

  const rendered = useMemo(() => {
    return renderPublic(data);
  }, [data]);

  if (router.isFallback || !post) {
    return <div>로딩중...</div>;
  }

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
        <span>{format(new Date(post.updated_at), "yyyy.MM.dd.")}</span>
      </div>
      <div className="article-body">{rendered}</div>
    </article>
  );
};

export default PostView;
