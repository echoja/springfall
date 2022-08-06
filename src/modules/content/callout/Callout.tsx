import type {
  CommonRenderElementProps,
  ICallout,
} from "@modules/content/types";

export interface IRenderCalloutProps extends CommonRenderElementProps {
  element: ICallout;
}

const Callout: React.FC<IRenderCalloutProps> = ({
  children,
  attributes,
  element,
}) => {
  return (
    <div className="flex" {...attributes}>
      <div>icon: {element?.icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
