import type { ReactNode } from "react";

export default function NoLayoutWrapper(page: ReactNode) {
  return <div>{page}</div>;
}
