import { POSTS_PER_PAGE } from "@common/config";
import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSwitch from "@modules/admin-ui/components/AdminSwitch";
import type { MonnomlogPage } from "@modules/content/types";
import AdminLayoutWrapper from "@modules/layout/AdminLayout";
import type { Post } from "@modules/supabase/supabase";
import { servicePosts } from "@modules/supabase/supabase-service";
import axiosGlobal from "axios";
import { format } from "date-fns";
import Joi from "joi";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const axios = axiosGlobal.create();

interface IPostListProps {
  posts: Post[];
  pageNum: number;
  count: number;
}

export const getServerSideProps: GetServerSideProps<IPostListProps> = async ({
  query,
}) => {
  if (typeof query.page !== "string") {
    throw new Error("page is not string");
  }
  const pageNum = parseInt(query.page, 10);

  const schema = Joi.number().integer().min(1);
  const result = schema.validate(pageNum);
  if (result.error) {
    return {
      notFound: true,
    };
  }
  const [{ count }, { data: posts, error }] = await Promise.all([
    servicePosts().select("*", {
      head: true,
      count: "exact",
    }),
    servicePosts()
      .select("*")
      .order("created_at", { ascending: false })
      .range((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE - 1),
  ]);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      notFound: true,
    };
  }

  if (!posts || posts.length === 0 || !count) {
    return {
      notFound: true,
    };
  }

  return { props: { posts, pageNum, count } };
};

const PostList: MonnomlogPage<IPostListProps> = ({ posts, count }) => {
  const router = useRouter();

  const handleChangePublished = useCallback(
    async (id: number, published: boolean) => {
      await axios.post<Post>(`/api/post/save/${id}`, {
        published,
      });
      await router.replace(router.asPath);
    },
    [router]
  );

  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="font-sans bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      제목
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      최근 수정
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      시리즈
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      카테고리
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      {/* <span className="sr-only">Edit</span> */}
                      공개 여부
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                        {post.id}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Link href={`/admin/post/edit/${post.id}`}>
                          <a>{post.title}</a>
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {format(new Date(post.updated_at), "yyyy.MM.dd.")}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        -
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        -
                      </td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium whitespace-nowrap sm:pr-6">
                        <AdminSwitch
                          checked={post.published}
                          onChange={async (checked) =>
                            handleChangePublished(post.id, checked)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <p>
                        총 <strong>{count}</strong> 개
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Link href="/admin/post/new">
        <a>
          <div className="mr-2">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <span>새 글 쓰기</span>
        </a>
      </Link>
    </div>
  );
};

PostList.layoutWrapper = AdminLayoutWrapper;

export default PostList;
