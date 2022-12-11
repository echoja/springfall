import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import {
  faHandsHoldingDollar,
  faQuestion,
  faSmile,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { memo } from "react";

const buttons: Array<{
  icon: IconDefinition;
  newWindow?: boolean;
  link: string;
  srOnly?: string;
}> = [
  {
    link: "https://github.com/echoja",
    icon: faQuestion,
    srOnly: "블로그 주인에 대한 자세한 정보 보기 (깃허브)",
  },
  {
    link: "https://github.com/sponsors/echoja",
    icon: faHandsHoldingDollar,
    srOnly: "블로그 주인에게 후원하기 (깃허브 스폰서)",
  },
  {
    link: "https://twitter.com/springfall_cc",
    icon: faTwitter,
    srOnly: "트위터",
  },
  {
    link: "https://github.com/monnomlog-donkasu/monnomlog-alpha",
    icon: faGithub,
    srOnly: "본 블로그의 소스 코드 보기 (깃허브)",
  },
];

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        {buttons.map(({ link, icon, newWindow = true, srOnly }) => (
          <Link
            key={link}
            href={link}
            target={newWindow ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
          >
            <FontAwesomeIcon icon={icon} />
            {srOnly ? <span className="sr-only">{srOnly}</span> : null}
          </Link>
        ))}
      </div>
      <p className="mb-4 text-sm">
        오늘도 행복한 하루 되세요.
        <span className="mx-2">
          <FontAwesomeIcon icon={faSmile} />
        </span>
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default memo(Footer);
