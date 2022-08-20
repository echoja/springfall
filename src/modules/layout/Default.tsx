import type { LayoutWrapper } from "@modules/content/types";

import Footer from "./Footer";
import Header from "./Header";

const Default: LayoutWrapper = ({ page }) => {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="p-8">
        <Header />
        <main className="mt-12 mb-24">{page}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Default;
