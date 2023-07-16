import type { LayoutWrapper } from "@modules/layout/types";

import Footer from "./Footer";
import Header from "./Header";

const Default: LayoutWrapper = ({ children: page }) => {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="p-4 md:p-8 sm:p-6">
        <Header />
        <main className="mt-12 mb-24">{page}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Default;
