import getImageFileSize from "@modules/file/get-image-size";
import { anonClient } from "@modules/supabase/supabase";
import { nanoid } from "nanoid";

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

export const uploadFile = async (file: File) => {
  // insert id to filename
  const lastDot = file.name.lastIndexOf(".");
  const newFilename = `${file.name.substring(
    0,
    lastDot
  )}-${nanoid()}${file.name.substring(lastDot)}`;

  // TODO: 이미지 업로드 Progrss Bar 구현
  // https://github.com/supabase/storage-api/issues/23#issuecomment-973277262
  const { data, error } = await anonClient.storage
    .from("uploads")
    .upload(newFilename, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("no response data");
  }

  const { error: publicUrlError, publicURL } = anonClient.storage
    .from("uploads")
    .getPublicUrl(data.Key.substring(data.Key.indexOf("/") + 1));

  if (publicUrlError) {
    throw publicUrlError;
  }

  if (!publicURL) {
    throw new Error("no publicURL");
  }

  return publicURL;
};

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
            uploadFile(file),
          ] as const);
          return { type: "IMAGE_UPLOAD_SUCCESS", ...actualSize, url };
        }
        return { type: "NO_IMAGE" };
      })(),
    };
  });
};
