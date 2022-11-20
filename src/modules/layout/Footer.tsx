import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import {
  faSmile,
  faQuestion,
  faGift,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { memo } from "react";

const buttons: Array<{
  icon: IconDefinition;
  newWindow?: boolean;
  link: string;
}> = [
  {
    link: "https://github.com/echoja",
    icon: faQuestion,
  },
  {
    link: "https://github.com/sponsors/echoja",
    icon: faGift,
  },
  {
    link: "https://twitter.com/springfall_cc",
    icon: faTwitter,
  },
  {
    link: "https://github.com/monnomlog-donkasu/monnomlog-alpha",
    icon: faGithub,
  },
];

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        {buttons.map(({ link, icon, newWindow = true }) => (
          <Link
            key={link}
            href={link}
            target={newWindow ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 transition rounded-full hover:bg-gray-400/10 hover:opacity-90"
          >
            <FontAwesomeIcon icon={icon} />
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
