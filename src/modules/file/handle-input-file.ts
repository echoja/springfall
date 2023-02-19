import type { ChangeEvent } from "react";

const handleInputFile = async (
  e: ChangeEvent<HTMLInputElement>,
  handler: (file: File) => Promise<void>
): Promise<void[]> => {
  const fileList = e.target.files;
  if (!fileList) {
    return Promise.reject(new Error("no file"));
  }

  const promises: Promise<void>[] = [];

  for (let i = 0; i < fileList.length; i += 1) {
    const file = fileList.item(i);
    if (file) {
      promises.push(handler(file));
    }
  }

  return Promise.all(promises);
};

export default handleInputFile;
