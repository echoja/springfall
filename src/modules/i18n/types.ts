export const i18n = {
  locales: ["ko", "en"] as const,
  defaultLocale: "ko" as const,
};

export type Locale = (typeof i18n)["locales"][number];
