import type React from "react";
import { twMerge } from "tailwind-merge";

import type {
  CommonRenderElementProps,
  IHeading,
} from "@modules/content/types";

export interface IHeadingProps extends CommonRenderElementProps {
  element: IHeading;
}

const defaultHeadingClassName = "font-semibold mt-[1.5em] mb-[0.5em]";

const Heading: React.FC<IHeadingProps> = ({
  children,
  element,
  attributes,
}) => {
  const { level = 2 } = element;
  switch (level) {
    case 1:
      return (
        <h1
          className={twMerge(defaultHeadingClassName, "text-4xl")}
          {...attributes}
        >
          {children}
        </h1>
      );
    /** case 2 is default! */
    case 3:
      return (
        <h3
          className={twMerge(defaultHeadingClassName, "text-xl")}
          {...attributes}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={twMerge(defaultHeadingClassName, "text-lg")}
          {...attributes}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5
          className={twMerge(defaultHeadingClassName, "text-md")}
          {...attributes}
        >
          {children}
        </h5>
      );
    case 6:
      return (
        <h6
          className={twMerge(defaultHeadingClassName, "text-sm")}
          {...attributes}
        >
          {children}
        </h6>
      );
    case 2:
    default:
      return (
        <h2
          className={twMerge(defaultHeadingClassName, "text-2xl")}
          {...attributes}
        >
          {children}
        </h2>
      );
  }
};

export default Heading;
