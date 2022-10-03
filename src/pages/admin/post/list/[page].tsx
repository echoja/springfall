import { POSTS_PER_PAGE } from "@common/config";
import { faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSwitch from "@modules/admin-ui/components/AdminSwitch";
import type { MonnomlogPage } from "@modules/content/types";
import AdminLayoutWrapper from "@modules/layout/AdminLayout";
import { checkPageNumber } from "@modules/route";
import type { Post } from "@modules/supabase/supabase";
import { getAnonClient } from "@modules/supabase/supabase";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

function handleChangePublished(id: number, published: boolean) {
  return getAnonClient()
    .from("posts")
    .update({
      published,
    })
    .eq("id", id)
    .select()
    .single();
}

function replacePost(posts: Post[], post: Post) {
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    const result = [...posts];
    result[index] = post;
    return result;
  }
  return posts;
}

const PostList: MonnomlogPage = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const page = useMemo(() => {
    const result = checkPageNumber(router.query.page);
    if (result.type === "ERROR") {
      return null;
    }
    return result.value;
  }, [router.query.page]);

  useEffect(() => {
    if (!page) {
      return;
    }
    getAnonClient()
      .from("posts")
      .select("*", {
        head: true,
        count: "exact",
      })
      .then((result) => {
        if (result.count) {
          setCount(result.count);
        }
      });

    getAnonClient()
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1)
      .then((result) => {
        if (result.data) {
          setPosts(result.data as Post[]);
        }
      });
  }, [page]);

  return (
    <div>
      <div className="flex flex-col mt-8 mb-5">
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
                          onChange={async (checked) => {
                            const result = await handleChangePublished(
                              post.id,
                              checked
                            );
                            if (result.data) {
                              setPosts(replacePost(posts, result.data as Post));
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <p className="px-3 py-2">
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

      <div className="flex justify-end">
        <Link href="/admin/post/new">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 font-sans text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon
              icon={faPen}
              className="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
            />
            새 글 쓰기
          </button>
        </Link>
      </div>
    </div>
  );
};

PostList.layoutWrapper = AdminLayoutWrapper;

export default PostList;
