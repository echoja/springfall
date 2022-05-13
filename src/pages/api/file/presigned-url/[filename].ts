import { authGuard } from "@lib/api-guard";
import AWSUploadManager from "@lib/client/AWSFileManager";
import type { NextApiRequest, NextApiResponse } from "next";

export default authGuard(async (req: NextApiRequest, res: NextApiResponse) => {
  const { filename, filetype } = req.query;
  if (typeof filename !== "string" || typeof filetype !== "string") {
    res.status(400).json({
      error: "filename is required",
    });
    return;
  }
  const result = await AWSUploadManager.getUploadUrl({ filename, filetype });

  res.statusCode = 200;
  res.json(result);
});
