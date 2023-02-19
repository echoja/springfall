import Link from "next/link";
import { memo } from "react";

import FaGitHub from "@modules/icons/FaGitHub";
import FaRegularSmile from "@modules/icons/FaRegularSmile";
import FaSolidHandsHoldingDollar from "@modules/icons/FaSolidHandsHoldingDollar";
import FaSolidQuestion from "@modules/icons/FaSolidQuestion";
import FaTwitter from "@modules/icons/FaTwitter";

const buttons: Array<{
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  newWindow?: boolean;
  link: string;
  srOnly?: string;
}> = [
  {
    link: "https://github.com/echoja",
    Icon: FaSolidQuestion,
    srOnly: "블로그 주인에 대한 자세한 정보 보기 (깃허브)",
  },
  {
    link: "https://github.com/sponsors/echoja",
    Icon: FaSolidHandsHoldingDollar,
    srOnly: "블로그 주인에게 후원하기 (깃허브 스폰서)",
  },
  {
    link: "https://twitter.com/springfall_cc",
    Icon: FaTwitter,
    srOnly: "트위터",
  },
  {
    link: "https://github.com/monnomlog-donkasu/monnomlog-alpha",
    Icon: FaGitHub,
    srOnly: "본 블로그의 소스 코드 보기 (깃허브)",
  },
];

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        {buttons.map(({ link, Icon, newWindow = true, srOnly }) => (
          <Link
            key={link}
            href={link}
            target={newWindow ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
          >
            <Icon className="w-4 h-4" />
            {srOnly ? <span className="sr-only">{srOnly}</span> : null}
          </Link>
        ))}
      </div>
      <p className="flex items-center justify-center gap-2 mb-4 text-sm leading-none">
        <span>오늘도 행복한 하루 되세요.</span>
        <FaRegularSmile className="inline w-4 h-4" />
        <span>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default memo(Footer);
