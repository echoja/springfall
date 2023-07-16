"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

import { useColorModeEffect } from "@modules/color-mode/color-mode";

const RootClientLayout: React.FC = () => {
  useColorModeEffect();
  return <GoogleAnalytics trackPageViews />;
};

export default RootClientLayout;
