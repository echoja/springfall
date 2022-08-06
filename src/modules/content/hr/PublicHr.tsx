import type { IContentElementProps, IHr } from "@modules/content/types";

const PublicHr: React.FC<IContentElementProps<IHr>> = () => {
  return <hr className="my-4" />;
};

export default PublicHr;
