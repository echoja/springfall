export const DEFAULT_UTTERANCES_REPO = "owner/repo";

export function getUtterancesRepo() {
  return process.env.NEXT_PUBLIC_UTTERANCES_REPO || DEFAULT_UTTERANCES_REPO;
}

export const DEFAULT_GISCUS_REPO = "owner/repo";

export function getGiscusRepo() {
  return process.env.NEXT_PUBLIC_GISCUS_REPO || DEFAULT_GISCUS_REPO;
}
