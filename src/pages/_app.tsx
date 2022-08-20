import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import {
  useColorMode,
  useColorModeEffect,
} from "@modules/color-mode/color-mode";
import type { MonnomlogPage } from "@modules/content/types";
import Default from "@modules/layout/Default";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@common/globals.css";

fontAwesomeConfig.autoAddCss = false;

interface IMyAppProps extends AppProps {
  Component: MonnomlogPage;
}

const MyApp = ({ Component, pageProps }: IMyAppProps) => {
  const LayoutWrapper = Component.layoutWrapper ?? Default;
  useColorModeEffect();
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content={colorMode === "light" ? "#ffffff" : "#1e293b"}
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <LayoutWrapper page={<Component {...pageProps} />} />
    </>
  );
};

export default MyApp;
