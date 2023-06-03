import { formatInTimeZone } from "date-fns-tz";
import Joi from "joi";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useMemo } from "react";

import { getBaseUrl } from "@common/config";
import { renderPublic } from "@modules/content/renderPublic";
import type { MonnomlogPage } from "@modules/content/types";
import FaSolidAxe from "@modules/icons/FaSolidAxe";
import type { Post } from "@modules/supabase/supabase";
import { getServiceClient } from "@modules/supabase/supabase-service";
import Utterances from "@modules/utterances";

interface IPostViewProps {
  post?: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await getServiceClient()
    .from("posts")
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

  if (id === 10) {
    return {
      redirect: {
        destination: "/article/puss-in-boots",
        permanent: true,
      },
    };
  }

  const schema = Joi.number().integer().min(1);
  const result = schema.validate(id);
  if (result.error) {
    throw new Error(`post number is not valid: ${params.id}`);
  }

  const { data: post } = await getServiceClient()
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("id", id)
    .single();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return { props: { post: post as Post } };
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

  const url = `${getBaseUrl()}${router.asPath}`;

  return (
    <article>
      <NextSeo
        title={post.title}
        canonical={url}
        description={post.summary}
        openGraph={{
          title: post.title,
          description: post.summary,
          url,
          type: "article",
          article: {
            publishedTime: post.created_at,
            modifiedTime: new Date(post.updated_at).toISOString(),
            // expirationTime: new Date(post.updated_at).setFullYear(toISOString(),
            // section: "Section II",
            // TODO: 작가 링크 추가
            // authors: [
            //   "https://www.example.com/authors/@firstnameB-lastnameB",
            // ],
            // TODO: add tags
            // tags: ["Tag A", "Tag B", "Tag C"],
          },
          // TODO: 대표 이미지 추가
          // images: [
          //   {
          //     url: "https://www.test.ie/images/cover.jpg",
          //     width: 850,
          //     height: 650,
          //     alt: "Photo of text",
          //   },
          // ],
        }}
      />

      <ArticleJsonLd
        type="Blog"
        url={url}
        title={post.title}
        // TODO: 이미지 추가
        images={[]}
        datePublished={new Date(post.created_at).toISOString()}
        dateModified={new Date(post.updated_at).toISOString()}
        authorName="봄가을"
        description={post.summary}
      />
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
      </header>
      <div className="inline-flex items-center gap-2 text-gray-500 mb-7">
        <FaSolidAxe className="w-4 h-4" />
        <span>
          {formatInTimeZone(
            new Date(post.updated_at),
            "Asia/Seoul",
            "yyyy.MM.dd."
          )}
        </span>
      </div>
      <div>{rendered}</div>
      <Utterances />
    </article>
  );
};

export default PostView;
