"use client";

import { useCallback } from "react";

import FileUploadArea from "@modules/admin-ui/components/FileUploadArea";

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
