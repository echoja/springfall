import React from "react";

import WordpressImportFileUpload from "@modules/import/wordpress/WordpressImportFileUpload";

// interface IWordpressProps {}

const ImportPage: React.FC = () => {
  return (
    <div className="my-6">
      <h2 className="my-2 text-lg font-medium">워드프레스</h2>

      <WordpressImportFileUpload />
    </div>
  );
};

export default ImportPage;
