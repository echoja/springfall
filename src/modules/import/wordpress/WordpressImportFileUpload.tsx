"use client";

import FileUploadArea from "@modules/admin-ui/components/FileUploadArea";
import { useCallback } from "react";

const WordpressImportFileUpload: React.FC = () => {
  const handleUploaded = useCallback(
    async ({ publicUrl }: { file: File; publicUrl: string }) => {
      await fetch("/api/import-wordpress-xml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ xmlurl: publicUrl }),
      });
    },
    []
  );

  return <FileUploadArea onUploaded={handleUploaded} />;
};

export default WordpressImportFileUpload;
