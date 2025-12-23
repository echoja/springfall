/** @lintignore */
export interface IExperience {
  company: string;
  role: string;
  period: string;
  details?: string[];
}

export const experiences: IExperience[] = [
  {
    company: "테크 스타트업 A",
    role: "시니어 프론트엔드 엔지니어",
    period: "2024 — 현재",
    details: [
      "Next.js 15 기반 SPA/SSR 하이브리드 전환으로 초기 로딩 속도 40% 개선",
      "디자인 시스템 정비 및 스토리북 구축으로 컴포넌트 재사용성 증대",
      "Playwright E2E 테스트 도입으로 배포 안정성 향상",
      "웹 접근성 개선 프로젝트 리드 (WCAG 2.1 AA 준수)",
      "팀 내 프론트엔드 베스트 프랙티스 가이드 작성 및 교육",
    ],
  },
  {
    company: "글로벌 IT 기업 B",
    role: "풀스택 엔지니어",
    period: "2022 — 2024",
    details: [
      "Node/React 모놀리식 아키텍처를 마이크로서비스로 리팩터링",
      "CI/CD 파이프라인 최적화로 배포 시간 60% 단축",
      "테스트 커버리지 45%에서 85%로 확대",
      "GraphQL API 설계 및 구현으로 네트워크 효율성 개선",
      "Docker/Kubernetes 기반 컨테이너 환경 구축 참여",
    ],
  },
  {
    company: "에듀테크 스타트업 C",
    role: "주니어 프론트엔드 개발자",
    period: "2020 — 2022",
    details: [
      "React Native 기반 모바일 앱 개발 (iOS/Android)",
      "Redux에서 Zustand로 상태관리 마이그레이션",
      "실시간 화상 수업 기능 WebRTC 구현",
      "사용자 피드백 기반 UI/UX 개선 작업",
      "애자일 스크럼 방법론 도입 및 스프린트 리드 경험",
    ],
  },
  {
    company: "프리랜서",
    role: "웹 개발자",
    period: "2019 — 2020",
    details: [
      "중소기업 대상 반응형 웹사이트 10+ 프로젝트 완료",
      "WordPress 커스텀 테마 및 플러그인 개발",
      "SEO 최적화 및 Google Analytics 설정",
      "클라이언트 요구사항 분석 및 기술 컨설팅",
    ],
  },
];
