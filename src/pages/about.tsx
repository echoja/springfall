import { NextSeo } from "next-seo";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <NextSeo title="about" />
      <article>
        <header className="mb-5">
          <h1 className="text-3xl font-semibold">ABOUT</h1>
        </header>
        <div>
          <p>본 블로그에 오신 것을 환영합니다.</p>
          <p>개발 관련 이야기나 각종 리뷰를 올립니다.</p>
          <p>
            뭔가 이야기를 하고 싶다면,{" "}
            <Link href="mailto:eszqsc112@gmail.com">eszqsc112@gmail.com</Link>
            으로 연락 주세요.
          </p>
        </div>
      </article>
    </>
  );
};

export default Page404;
