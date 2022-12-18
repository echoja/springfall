import FileUploadArea from "@modules/admin-ui/components/FileUploadArea";
import type React from "react";

// interface IWordpressProps {}

const ImportPage: React.FC = () => {
  return (
    <div className="my-6">
      <h2 className="my-2 text-lg font-medium">워드프레스</h2>

      <FileUploadArea />
    </div>
  );
};

export default ImportPage;
