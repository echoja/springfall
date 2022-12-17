import type React from "react";
import { twMerge } from "tailwind-merge";

import style from "./fa-icon.module.css";

const FaSolidCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className } = props;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={twMerge(style["fa-icon"], className)}
      viewBox="0 0 512 512"
    >
      {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
};

export default FaSolidCheck;
