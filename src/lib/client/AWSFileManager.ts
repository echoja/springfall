import { S3Client } from "@aws-sdk/client-s3";
import type { PresignedPostOptions } from "@aws-sdk/s3-presigned-post";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getS3BucketName, getS3Credentials, getS3Region } from "@lib/config";
import type { IFileManager } from "@lib/types";
import { noopFunction } from "@lib/util";

const Bucket = getS3BucketName();
const Key = "user/eric/1";
const Fields = {
  acl: "public-read",
};

const client = new S3Client({
  credentials: getS3Credentials(),
  region: getS3Region(),
});
const Conditions: PresignedPostOptions["Conditions"] = [
  { acl: "public-read" },
  { bucket: Bucket },
  ["starts-with", "$key", "user/eric/"],
];

const AWSUploadManager: IFileManager = {
  getUploadUrl: async () => {
    const { url, fields } = await createPresignedPost(client, {
      Bucket,
      Key,
      Conditions,
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
