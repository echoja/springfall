import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSmile } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const socialLinks = [
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
      <div className="flex items-center justify-center mb-4">
        {socialLinks.map(({ link, icon }) => (
          <a
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
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
