import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Default = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="p-8">
        <Header />
        <main className="mt-12 mb-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Default;
