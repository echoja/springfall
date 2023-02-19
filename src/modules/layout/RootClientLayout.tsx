"use client";

import { useUpdateSession } from "@modules/auth/use-session";
import { useColorModeEffect } from "@modules/color-mode/color-mode";
import { GoogleAnalytics } from "nextjs-google-analytics";

const RootClientLayout: React.FC = () => {
  useColorModeEffect();
  useUpdateSession();
  return <GoogleAnalytics trackPageViews />;
};

export default RootClientLayout;
