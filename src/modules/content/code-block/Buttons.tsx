import type { ReactNode } from "react";

const Buttons: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (!Array.isArray(children) && children) ||
    (Array.isArray(children) &&
      children.filter((v) => Boolean(v)).length !== 0) ? (
    <div className="absolute inline-flex items-center gap-3 text-white top-3 right-3">
      {children}
    </div>
  ) : null;
};

export default Buttons;
