import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Default = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="p-8">
        <Header />
        <main className="mt-12 mb-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Default;
