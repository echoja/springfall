import type { ReactNode } from "react";

const Buttons: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (!Array.isArray(children) && children) ||
    (Array.isArray(children) &&
      children.filter((v) => Boolean(v)).length !== 0) ? (
    <div className="absolute inline-flex items-center gap-3 px-3 py-1 -mt-2 -mr-3 text-white rounded top-3 right-3 bg-slate-700/70">
      {children}
    </div>
  ) : null;
};

export default Buttons;
