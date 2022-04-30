import { ChakraProvider } from "@chakra-ui/react";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import type { MonnomlogPage } from "@lib/types";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "lib/components/layout";
import { customTheme } from "lib/style";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "lib/globals.css";

fontAwesomeConfig.autoAddCss = false;

const defaultGetLayout = (page: ReactElement) => <Layout>{page}</Layout>;

interface IMyAppProps extends AppProps {
  Component: MonnomlogPage;
}

const MyApp = ({ Component, pageProps }: IMyAppProps) => {
  const wrap = Component.layoutWrapper ?? defaultGetLayout;

  return (
    <ChakraProvider theme={customTheme}>
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
    </ChakraProvider>
  );
};

export default MyApp;
