import type React from "react";
import { twMerge } from "tailwind-merge";

import style from "./fa-icon.module.css";

const FaSolidAngleLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className } = props;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={twMerge(style["fa-icon"], className)}
      viewBox="0 0 320 512"
    >
      {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </svg>
  );
};

export default FaSolidAngleLeft;
