import type { LayoutWrapper } from "@modules/content/types";

const NoLayoutWrapper: LayoutWrapper = ({ children: page }) => {
  return <div>{page}</div>;
};

export default NoLayoutWrapper;
