import MDX from "./page.mdx";

export { metadata } from "./page.mdx";

// mdx 컴포넌트 타입이 Next.js 페이지 컴포넌트 타입과 달라 오류가 발생함. 간단하게 래핑합니다.
export default function Page() {
  return <MDX />;
}
