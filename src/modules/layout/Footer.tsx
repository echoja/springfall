import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSmile } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="mb-4">
        <a
          href="https://twitter.com/springfall_cc"
          target="_blank"
          rel="noreferrer"
        >
          {/* <Tooltip hasArrow aria-label="트위터" label="트위터" placement="top"> */}
          <FontAwesomeIcon icon={faTwitter} size="lg" />
          {/* </Tooltip> */}
        </a>
      </div>
      <p className="text-sm mb-4">
        오늘도 행복한 하루 되세요 # <FontAwesomeIcon icon={faSmile} />
        {" # "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default memo(Footer);
