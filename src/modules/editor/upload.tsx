import getImageFileSize from "@modules/file/get-image-size";
import uploadFile from "@modules/file/upload-file";

export async function srcToFile(src: string) {
  try {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const mimeType = response.headers.get("content-type") || "";
    let filename = "file";
    if (mimeType.startsWith("image/")) {
      const extension = mimeType.split("/")?.[1];
      if (extension) {
        filename = `image.${extension}`;
      }
    }
    return new File([arrayBuffer], filename, { type: mimeType });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    // eslint-disable-next-line no-alert
    alert(
      `srcToFile 링크를 가져오는 데 실패했습니다: ${src} 콘솔을 확인하세요.`
    );
    return null;
  }
}

type UploadResult =
  | {
      type: "IMAGE_UPLOAD_SUCCESS";
      width: number;
      height: number;
      url: string;
    }
  | { type: "NO_IMAGE" };

export const uploadImage = (
  files: { id: string; file: File }[]
): {
  id: string;
  promise: Promise<UploadResult>;
}[] => {
  return files.map(({ id, file }) => {
    return {
      id,
      promise: (async () => {
        if (file.type.includes("image")) {
          const [actualSize, url] = await Promise.all([
            getImageFileSize(file),
            uploadFile(file, "uploads"),
          ] as const);
          return { type: "IMAGE_UPLOAD_SUCCESS", ...actualSize, url };
        }
        return { type: "NO_IMAGE" };
      })(),
    };
  });
};
