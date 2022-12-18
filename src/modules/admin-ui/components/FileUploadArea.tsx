"use client";

import handleInputFile from "@modules/file/handle-input-file";
import uploadFile from "@modules/file/upload-file";
import type { ChangeEvent } from "react";

interface IFileUploadAreaProps {
  onUploaded?: (args: { file: File; publicUrl: string }) => void;
}

const FileUploadArea: React.FC<IFileUploadAreaProps> = ({ onUploaded }) => {
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleInputFile(e, async (file) => {
      const publicUrl = await uploadFile(file, "uploads/wordpress-xml");
      onUploaded?.({ file, publicUrl });
      console.log("file, publicurl", file, publicUrl);
    });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">클릭</span> 혹은 드래그 드롭하여
            파일을 업로드합니다.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            워드프레스에서 내보내기로 추출된 XML 파일을 업로드 해주세요.
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChangeFile}
        />
      </label>
    </div>
  );
};

export default FileUploadArea;
