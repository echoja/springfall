import { getAnonClient } from "@modules/supabase/supabase";

import { accessTokenKey, refreshTokenKey } from "./const";

export async function requestWithAuth(input: RequestInfo, init?: RequestInit) {
  const res = await getAnonClient().auth.getSession();

  if (!res.data || !res.data.session) {
    // TODO: 좀 더 나이스하게 에러 처리하기
    throw new Error("Unauthorized");
  }

  return fetch(input, {
    ...init,
    method: init?.method ?? "POST",
    headers: {
      ...init?.headers,
      [accessTokenKey]: res.data.session.access_token,
      [refreshTokenKey]: res.data.session.refresh_token,
    },
  });
}

export function useRequestWithAuth() {
  // TODO: 구현
}
