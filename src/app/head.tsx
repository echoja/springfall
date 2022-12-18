import ClientHead from "@modules/layout/ClientHead";
import { NextSeo } from "next-seo";

import defaultSEOConfig from "../../next-seo.config";

export default function Head() {
  return (
    <>
      {/* <title>My Next.js App</title> */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <NextSeo {...defaultSEOConfig} useAppDir />
      <ClientHead />
    </>
  );
}
