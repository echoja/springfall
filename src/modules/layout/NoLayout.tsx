import type { LayoutWrapper } from "@modules/content/types";

const NoLayoutWrapper: LayoutWrapper = ({ page }) => {
  return <div>{page}</div>;
};

export default NoLayoutWrapper;
