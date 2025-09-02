import type { IProject } from "./types";

export const projects: IProject[] = [
  {
    title: "오픈소스 컨트리뷰터 - React Query",
    period: "2024 — 현재",
    description:
      "React Query 오픈소스 프로젝트에 기여. 문서 개선, 버그 수정, 새로운 기능 제안 및 구현을 통해 커뮤니티에 기여했습니다.",
    link: "https://github.com/tanstack/query",
    tags: ["Open Source", "React", "TypeScript"],
    highlights: [
      "문서 개선 PR 5개 머지",
      "성능 최적화 관련 이슈 해결",
      "1000+ GitHub 스타 프로젝트 기여",
    ],
  },
  {
    title: "AI 기반 코드 리뷰 플랫폼",
    period: "2024",
    description:
      "GPT-4 API를 활용한 자동 코드 리뷰 시스템. GitHub Actions와 연동하여 PR에 자동으로 코드 품질 피드백을 제공합니다.",
    tags: ["Next.js", "OpenAI API", "GitHub Actions", "PostgreSQL"],
    highlights: [
      "코드 리뷰 시간 70% 단축",
      "10,000+ 코드 리뷰 처리",
      "팀 생산성 30% 향상",
      "WebSocket 기반 실시간 피드백",
    ],
  },
  {
    title: "실시간 협업 화이트보드 앱",
    period: "2023 — 2024",
    description:
      "WebRTC와 Socket.io를 활용한 실시간 협업 화이트보드. 여러 명이 동시에 그림을 그리고 화상 회의를 할 수 있는 플랫폼입니다.",
    tags: ["React", "WebRTC", "Socket.io", "Canvas API"],
    highlights: [
      "동시 접속 100명 지원",
      "드로잉 동기화 지연 50ms 이하",
      "PWA 지원으로 오프라인 모드 제공",
    ],
  },
  {
    title: "E-Commerce 플랫폼 리뉴얼",
    period: "2023",
    description:
      "레거시 jQuery 기반 쇼핑몰을 React/Next.js로 전면 리뉴얼. 성능 개선과 함께 사용자 경험을 크게 향상시켰습니다.",
    tags: ["Next.js", "Stripe", "Prisma", "Redis"],
    highlights: [
      "페이지 로드 속도 60% 개선",
      "전환율 25% 증가",
      "모바일 사용자 경험 대폭 개선",
      "Lighthouse 점수 95+ 달성",
    ],
  },
  {
    title: "팀 내부 기술 블로그 구축",
    period: "2022 — 2023",
    description:
      "MDX 기반의 기술 블로그 플랫폼. 팀원들이 기술 경험과 지식을 공유할 수 있는 내부 지식 공유 플랫폼을 구축했습니다.",
    tags: ["Gatsby", "MDX", "GraphQL", "Algolia"],
    highlights: [
      "200+ 기술 아티클 축적",
      "검색 기능 및 태그 시스템 구현",
      "팀 지식 공유 활성화",
    ],
  },
  {
    title: "모바일 피트니스 트래킹 앱",
    period: "2022",
    description:
      "React Native로 개발한 피트니스 트래킹 앱. 운동 루틴 관리, 칼로리 추적, 진행 상황 시각화 기능을 제공합니다.",
    tags: ["React Native", "Expo", "Firebase", "HealthKit"],
    highlights: [
      "5,000+ 다운로드",
      "4.5점 앱스토어 평점",
      "HealthKit/Google Fit 연동",
    ],
  },
  {
    title: "개발자 포트폴리오 템플릿",
    period: "2021",
    description:
      "개발자들을 위한 오픈소스 포트폴리오 템플릿. 반응형 디자인, 다크모드, 다국어 지원 기능을 포함합니다.",
    link: "https://github.com/username/portfolio-template",
    tags: ["Vue.js", "Nuxt.js", "SCSS"],
    highlights: ["GitHub 2,000+ 스타", "500+ 포크", "10개 국어 지원"],
  },
];
