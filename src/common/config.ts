export const DEFAULT_UTTERANCES_REPO = "owner/repo";

export function getUtterancesRepo() {
  return process.env.NEXT_PUBLIC_UTTERANCES_REPO || DEFAULT_UTTERANCES_REPO;
}
