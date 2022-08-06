import type {
  CommonRenderElementProps,
  ICallout,
} from "@modules/content/types";

export interface IRenderCalloutProps extends CommonRenderElementProps {
  element: ICallout;
}

const PublicCallout: React.FC<IRenderCalloutProps> = ({
  children,
  element,
}) => {
  return (
    <div className="flex">
      <div>icon: {element?.icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default PublicCallout;
