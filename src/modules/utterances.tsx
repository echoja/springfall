import { useEffect, useState } from "react";

import { DEFAULT_UTTERANCES_REPO, getUtterancesRepo } from "@common/config";

import { useColorMode } from "./color-mode/color-mode";

const Utterances = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const repo = getUtterancesRepo();

    if (ref && repo !== DEFAULT_UTTERANCES_REPO) {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("repo", repo);
      script.setAttribute("issue-term", "pathname");
      script.setAttribute(
        "theme",
        colorMode === "dark" ? "github-dark" : "github-light"
      );
      ref.appendChild(script);
      return () => {
        script.remove();
        while (ref.firstChild) {
          ref.removeChild(ref.firstChild);
        }
      };
    }

    return undefined;
  }, [colorMode, ref]);

  return <div ref={setRef} />;
};

export default Utterances;
