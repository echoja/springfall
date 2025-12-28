"use client";

import { useEffect, useRef } from "react";

import { DEFAULT_DISQUS_SHORTNAME, getDisqusShortname } from "@common/config";

import { useColorMode } from "./color-mode/color-mode";

interface IDisqusConfig {
  page: {
    url: string;
    identifier: string;
  };
  language?: string;
}

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config: () => void }) => void;
    };
    disqus_config?: (this: IDisqusConfig) => void;
  }
}

const Disqus = () => {
  const { resolved } = useColorMode();
  const loaded = useRef(false);

  useEffect(() => {
    const shortname = getDisqusShortname();
    if (shortname === DEFAULT_DISQUS_SHORTNAME) {
      return;
    }

    // Configure Disqus
    window.disqus_config = function (this: IDisqusConfig) {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
    };

    if (!loaded.current) {
      // Load Disqus script for the first time
      const script = document.createElement("script");
      script.src = `https://${shortname}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", String(+new Date()));
      script.async = true;
      (document.head || document.body).appendChild(script);
      loaded.current = true;
    }
  }, []);

  // Reset Disqus when theme changes
  useEffect(() => {
    if (loaded.current && window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: IDisqusConfig) {
          this.page.url = window.location.href;
          this.page.identifier = window.location.pathname;
          // Note: Disqus doesn't natively support dynamic theme switching
          // Users may need to refresh the page to see theme changes
        },
      });
    }
  }, [resolved]);

  return (
    <div
      id="disqus_thread"
      className="lg:-translate-x-38"
      data-theme={resolved}
    />
  );
};

export default Disqus;
