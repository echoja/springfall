import type { LayoutWrapper } from "@modules/layout/types";

const NoLayoutWrapper: LayoutWrapper = ({ children: page }) => {
  return <div>{page}</div>;
};

export default NoLayoutWrapper;
