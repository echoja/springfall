import { useUpdateSession } from "@modules/auth/use-session";
import {
  useColorMode,
  useColorModeEffect,
} from "@modules/color-mode/color-mode";
import type { MonnomlogPage } from "@modules/content/types";
import Default from "@modules/layout/Default";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";

import defaultSEOConfig from "../../next-seo.config";

import "@common/globals.css";

interface IMyAppProps extends AppProps {
  Component: MonnomlogPage;
}

const MyApp = ({ Component, pageProps }: IMyAppProps) => {
  const LayoutWrapper = Component.layoutWrapper ?? Default;
  useColorModeEffect();
  const { colorMode } = useColorMode();
  useUpdateSession();

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
      <GoogleAnalytics trackPageViews />
      <DefaultSeo {...defaultSEOConfig} />
      <LayoutWrapper page={<Component {...pageProps} />} />
    </>
  );
};

export default MyApp;
