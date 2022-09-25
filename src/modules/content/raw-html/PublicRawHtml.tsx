import type { IContentElementProps, IRawHtml } from "@modules/content/types";

const PublicRawHtml: React.FC<IContentElementProps<IRawHtml>> = ({
  element,
}) => {
  return (
    <div
      className="my-10 overflow-hidden rounded-md shadow-xl bg-white/70"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  );
};

export default PublicRawHtml;
