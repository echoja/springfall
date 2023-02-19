import type { IContentElementProps, ICodeBlock } from "../types";
import CopyButton from "@modules/admin-ui/CopyButton";

import Buttons from "./Buttons";
import codeNodeToString from "./code-node-to-string";
import CodeBlockLayout from "./CodeBlockLayout";

const PublicCodeBlock: React.FC<IContentElementProps<ICodeBlock>> = ({
  children,
  element,
}) => {
  return (
    <CodeBlockLayout
      element={element}
      renderedButtons={
        <Buttons>
          {element.showCopy && (
            <CopyButton getString={() => codeNodeToString(element)} />
          )}
        </Buttons>
      }
    >
      {children}
    </CodeBlockLayout>
  );
};

export default PublicCodeBlock;
