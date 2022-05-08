import { authGuard } from "@lib/api-guard";
import AWSUploadManager from "@lib/client/AWSFileManager";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await AWSUploadManager.getUploadUrl();

  res.statusCode = 200;
  res.json(result);
});
