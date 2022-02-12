import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export * from "./merge";

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  wrap?: (page: ReactElement) => ReactNode;
};
