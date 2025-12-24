import type { Locale } from "@/modules/i18n/types";

interface UiText {
  headerTitle: string;
  backToList: string;
  footerGithub: string;
  footerThreads: string;
  footerLinkedin: string;
  availableLabel: string;
  tocTitle: string;
  tocFloatingLabel: string;
  tocCloseLabel: string;
  themeLabel: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
}

export const uiText: Record<Locale, UiText> = {
  ko: {
    headerTitle: "봄가을 블로그",
    backToList: "글 목록으로 이동",
    footerGithub: "블로그 주인에 대한 자세한 정보 보기 (깃허브)",
    footerThreads: "스레드",
    footerLinkedin: "링크드인",
    availableLabel: "언어:",
    tocTitle: "목차",
    tocFloatingLabel: "플로팅 목차",
    tocCloseLabel: "목차 닫기",
    themeLabel: "테마",
    themeSystem: "시스템",
    themeLight: "라이트",
    themeDark: "다크",
  },
  en: {
    headerTitle: "Springfall Blog",
    backToList: "Back to articles",
    footerGithub: "More about the author (GitHub)",
    footerThreads: "Threads",
    footerLinkedin: "LinkedIn",
    availableLabel: "Available:",
    tocTitle: "Table of Contents",
    tocFloatingLabel: "Floating table of contents",
    tocCloseLabel: "Close table of contents",
    themeLabel: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
  },
};
