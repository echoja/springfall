import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export * from "./merge";
export * from "./content";

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  layoutWrapper?: (page: ReactElement) => ReactNode;
};
