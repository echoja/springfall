import type {
  CommonRenderElementProps,
  IHeading,
} from "@modules/content/types";
import { createElementComponent } from "@modules/editor/custom-slate-editor";
import { twMerge } from "tailwind-merge";

export interface IHeadingProps extends CommonRenderElementProps {
  element: IHeading;
}

const defaultHeadingClassName = "font-semibold mt-[1.5em] mb-[0.5em]";

const { EditorComponent: Heading, PublicComponent } =
  createElementComponent<IHeadingProps>(({ children, element, attributes }) => {
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
  });

export const PublicHeading = PublicComponent;

export default Heading;
