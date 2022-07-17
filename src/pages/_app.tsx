import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import Default from "@lib/components/layout/Default";
import useConst from "@lib/hooks/use-const";
import { useMyStoreMemo } from "@lib/store";
import type { MonnomlogPage } from "@modules/content/types";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { useEffect } from "react";

import defaultSEOConfig from "../../next-seo.config";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@lib/globals.css";

fontAwesomeConfig.autoAddCss = false;

const defaultGetLayout = (page: ReactElement) => <Default>{page}</Default>;

interface IMyAppProps extends AppProps {
  Component: MonnomlogPage;
}

const MyApp = ({ Component, pageProps }: IMyAppProps) => {
  const wrap = Component.layoutWrapper ?? defaultGetLayout;

  const colorMode = useMyStoreMemo((store) => {
    return store.colorMode;
  }, []);
  const toggleColorMode = useMyStoreMemo((store) => {
    return store.toggleColorMode;
  }, []);

  const firstColorMode = useConst(colorMode);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      firstColorMode === "light"
    ) {
      toggleColorMode();
    }
  }, [toggleColorMode, firstColorMode]);

  useEffect(() => {
    if (colorMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [colorMode]);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link
          rel="preload"
          href="/IropkeBatangM.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      {wrap(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default MyApp;
