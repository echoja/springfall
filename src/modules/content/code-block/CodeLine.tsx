import type { ICodeLine, IContentElementProps } from "@modules/content/types";

const CodeLine: React.FC<IContentElementProps<ICodeLine>> = ({
  children,
  attributes,
}) => {
  return (
    <div
      {...attributes}
      // className={(element.properties?.className ?? []).join(" ")}
    >
      {children}
    </div>
  );
};

export default CodeLine;
