import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import Default from "@lib/components/layout/Default";
import useConst from "@lib/hooks/use-const";
import { useMyStoreMemo } from "@lib/store";
import supabase from "@lib/supabase";
import type { MonnomlogPage } from "@lib/types";
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
  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      }
    );
    if (error) {
      // eslint-disable-next-line no-console
      console.error("supabase.auth.onAuthStateChange", error);
    }

    return () => {
      data?.unsubscribe();
    };
  }, []);

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
    <>
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
    </>
  );
};

export default MyApp;
