import { getAnonClient } from "@modules/supabase/supabase";
import { nanoid } from "nanoid";

const uploadFile = async (file: File, storageName: string) => {
  // insert id to filename
  const lastDot = file.name.lastIndexOf(".");
  const newFilename = `${file.name.substring(
    0,
    lastDot
  )}-${nanoid()}${file.name.substring(lastDot)}`;

  // TODO: 이미지 업로드 Progrss Bar 구현
  // https://github.com/supabase/storage-api/issues/23#issuecomment-973277262
  const { data, error } = await getAnonClient()
    .storage.from(storageName)
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

  const {
    data: { publicUrl },
  } = getAnonClient().storage.from(storageName).getPublicUrl(data.path);

  return publicUrl;
};

export default uploadFile;
