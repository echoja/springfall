export const DEFAULT_UTTERANCES_REPO = "owner/repo";

export function getUtterancesRepo() {
  return process.env.NEXT_PUBLIC_UTTERANCES_REPO || DEFAULT_UTTERANCES_REPO;
}

export const DEFAULT_DISQUS_SHORTNAME = "your-disqus-shortname";

export function getDisqusShortname() {
  return process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || DEFAULT_DISQUS_SHORTNAME;
}
