import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getS3BucketName, getS3Credentials, getS3Region } from "@common/config";
import { noopFunction } from "@common/util";
import type { IFileManager } from "@modules/content/types";
import { nanoid } from "nanoid";

const Bucket = getS3BucketName();
const Fields = {
  acl: "public-read",
};

const client = new S3Client({
  credentials: getS3Credentials(),
  region: getS3Region(),
});

const AWSUploadManager: IFileManager = {
  getUploadUrl: async ({ filename, filetype }) => {
    const { url, fields } = await createPresignedPost(client, {
      Bucket,
      Key: `uploads/${nanoid()}-${filename}`,
      Conditions: [
        { acl: "public-read" },
        { bucket: Bucket },
        ["starts-with", "$key", "uploads/"],
        ["eq", "$Content-Type", filetype],
      ],
      Fields,
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });
    return {
      headers: fields,
      method: "POST",
      url,
    };
  },
  getFileInfo: noopFunction,
  removeFile: noopFunction,
};

export default AWSUploadManager;
