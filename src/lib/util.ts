export function roughlyParseQueryToNumber(
  queryVar: string | string[] | undefined
): number {
  return Number.parseInt(
    (Array.isArray(queryVar) ? queryVar[0] : queryVar) ?? "",
    10
  );
}
