import { DEFAULT_UTTERANCES_REPO, getUtterancesRepo } from "@common/config";
import { useEffect, useState } from "react";

const Utterances = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const repo = getUtterancesRepo();

    if (ref && repo !== DEFAULT_UTTERANCES_REPO) {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("repo", repo);
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", "preferred-color-scheme");
      ref.appendChild(script);
      return () => {
        script.remove();
        while (ref.firstChild) {
          ref.removeChild(ref.firstChild);
        }
      };
    }

    return undefined;
  }, [ref]);

  return <div ref={setRef} />;
};

export default Utterances;
