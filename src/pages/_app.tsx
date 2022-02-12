/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "lib/components/layout";
import createEmotionCache from "lib/styles/createEmotionCache";
import customTheme from "lib/styles/customTheme";

import "@fontsource/lexend/latin.css";
import "lib/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: IMyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <DefaultSeo {...defaultSEOConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
