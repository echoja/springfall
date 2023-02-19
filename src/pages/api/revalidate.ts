// import { getAnonClient } from "@modules/supabase/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

import { accessTokenKey, refreshTokenKey } from "@modules/auth/const";
import { getAnonClient } from "@modules/supabase/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: 액세스 토큰 검사 로직 분리
  const accessToken = req.headers[accessTokenKey];
  const refreshToken = req.headers[refreshTokenKey];

  if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
    return res.status(401).json({
      error: `Missing access token or refresh Token: ${JSON.stringify({
        accessToken,
        refreshToken,
      })}`,
    });
  }

  const client = getAnonClient();
  await client.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const { data, error } = await client.auth.getUser(accessToken);

  if (error) {
    return res.status(401).json({
      error: error.message,
    });
  }

  if (data.user && data.user.email !== "eszqsc112@gmail.com") {
    return res.status(401).json({
      error: `Unauthorized user: ${data.user.email}`,
    });
  }

  // TODO: revalidate_url 안정성 강화
  const { revalidate_url } = JSON.parse(req.body);
  try {
    await res.revalidate(revalidate_url);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({
      error: `Error while revalidating: ${(e as Error).message}`,
    });
  }

  return res.status(200).json({
    message: "Revalidation done",
  });
};
