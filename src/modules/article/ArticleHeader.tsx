import dayjs from "dayjs";

import FaSolidAxe from "@modules/icons/FaSolidAxe";

export default function ArticleHeader({
  title,
  updatedAt,
  desc,
}: {
  title: string;
  updatedAt: string;
  desc?: string;
}) {
  return (
    <>
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </header>
      <p>{desc}</p>
      <div className="inline-flex items-center gap-2 text-gray-500 mb-7">
        <FaSolidAxe className="w-4 h-4" />
        <span>{dayjs(updatedAt).format("YYYY.MM.DD.")}</span>
      </div>
    </>
  );
}
