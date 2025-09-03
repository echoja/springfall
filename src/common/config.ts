export const DEFAULT_UTTERANCES_REPO = "owner/repo";

export function getUtterancesRepo() {
  return process.env.NEXT_PUBLIC_UTTERANCES_REPO || DEFAULT_UTTERANCES_REPO;
}

export const i18n = {
  locales: ["ko", "en"] as const,
  defaultLocale: "ko" as const,
};

export type Locale = (typeof i18n)["locales"][number];
