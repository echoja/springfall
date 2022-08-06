import type { IContentElementProps, IHeading } from "@modules/content/types";
import type React from "react";
import { twMerge } from "tailwind-merge";

const defaultHeadingClassName = "font-semibold mt-[1.5em] mb-[0.5em]";

const PublicHeading: React.FC<IContentElementProps<IHeading>> = ({
  children,
  element,
}) => {
  const { level = 2 } = element;
  switch (level) {
    case 1:
      return (
        <h1 className={twMerge(defaultHeadingClassName, "text-4xl")}>
          {children}
        </h1>
      );
    /** case 2 is default! */
    case 3:
      return (
        <h3 className={twMerge(defaultHeadingClassName, "text-xl")}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={twMerge(defaultHeadingClassName, "text-lg")}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={twMerge(defaultHeadingClassName, "text-md")}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={twMerge(defaultHeadingClassName, "text-sm")}>
          {children}
        </h6>
      );
    case 2:
    default:
      return (
        <h2 className={twMerge(defaultHeadingClassName, "text-2xl")}>
          {children}
        </h2>
      );
  }
};

export default PublicHeading;
