import type { NextApiRequest } from "next";

/**
 * query(`string | string[] | undefined`)를 number로 변환합니다.
 * 실패시 NaN을 반환합니다.
 */
export function parseQueryToNumber(
  queryVar: string | string[] | undefined,
): number {
  return Number.parseInt(
    (Array.isArray(queryVar) ? queryVar[0] : queryVar) ?? "",
    10,
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function noopFunction(..._args: any): any {
  // noop
}

export async function getJsonFromBody<T>(
  req: NextApiRequest,
): Promise<Partial<T>> {
  const reader = req.body?.getReader();
  if (!reader) {
    throw new Error("No reader");
  }

  const decoder = new TextDecoder();
  let body = "";
  const read = async () => {
    const result = await reader.read();
    if (result.done) {
      return;
    }
    body += decoder.decode(result.value, { stream: true });
    await read();
  };

  await read();
  body += decoder.decode();

  return JSON.parse(body) as T;
}
