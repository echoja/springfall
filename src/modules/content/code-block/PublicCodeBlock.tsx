import { codeNodeToString } from "@common/util";
import CopyButton from "@modules/admin-ui/CopyButton";

import type { CodeBlockComponent } from "../types";

import Buttons from "./Buttons";
import CodeBlockLayout from "./CodeBlockLayout";

const PublicCodeBlock: CodeBlockComponent = ({ children, element }) => {
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
