import type { IContentElementProps, IHr } from "@modules/content/types";

const Hr: React.FC<IContentElementProps<IHr>> = ({ attributes }) => {
  return <hr className="my-4" {...attributes} />;
};

export default Hr;
