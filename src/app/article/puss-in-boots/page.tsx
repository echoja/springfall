import MDX from "./page.mdx";

export { metadata } from "./page.mdx";

export default MDX;

// export const authors = [
//   {
//     name: "김태훈",
//     url: "https://github.com",
//   },
//   {
//     name: "Mary Stone",
//     url: "https://example.com",
//   },
// ];

// export const title = "[영화 리뷰] 장화신은 고양이: 끝내주는 모험 (스포)";

// export default function Page() {
//   return <Doc />;
// }

// export const metadata: Metadata = {
//   title: "[영화 리뷰] 장화신은 고양이: 끝내주는 모험 (스포)",
//   other: {
//     updatedAt: dayjs("2023-02-12").toISOString(),
//   },
//   authors: [
//     {
//       name: "EzKorry",
//       url: "https://github.com/echoja",
//     },
//   ],
// };

// export default function Page() {
//   return (
//     <>
//       <header className="mb-5">
//         <h1 className="text-3xl font-semibold">{metadata.title?.toString()}</h1>
//       </header>
//       <div className="inline-flex items-center gap-2 text-gray-500 mb-7">
//         <FaSolidAxe className="w-4 h-4" />
//         <span>{metadata.other?.updatedAt}</span>
//       </div>
//       <Doc title="" />
//     </>
//   );
// }
