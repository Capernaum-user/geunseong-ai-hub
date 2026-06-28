// ─────────────────────────────────────────────────────────────────────────
// 카테고리(허브) 단일 데이터 소스 (Single Source of Truth)
//
// 이 배열 하나가 홈(content/index.md) 아래 허브 카드 그리드(HubGrid)와
// 상단 내비게이션(Nav)을 동시에 구동한다.
//
// 새 카테고리 추가:
//   1) 아래 HUBS 배열에 한 줄 추가  ({ slug, label, nav, en, desc, color })
//   2) content/<slug>/index.md 폴더/노트 추가
//   → 홈 카드 + 상단 네비가 함께 갱신된다.
// ─────────────────────────────────────────────────────────────────────────

export type HubEntry = {
  /** URL slug + content 폴더명 (예: "agents" → /agents, content/agents) */
  slug: string
  /** 홈 카드 한글 제목 (hub-ko) */
  label: string
  /** 상단 네비 라벨 (홈 카드보다 짧은 표기) */
  nav: string
  /** 영문 라벨 (hub-en) */
  en: string
  /** 한 줄 설명 (hub-desc) */
  desc: string
  /** 좌측 컬러 bar 색 (hex). 인라인 CSS 변수 --bar 로 주입된다. */
  color: string
  /** 선택: 카드 제목 옆 배지 (예: "비주력") */
  tag?: string
}

export const HUBS: HubEntry[] = [
  {
    slug: "agents",
    label: "AI 에이전트",
    nav: "에이전트",
    en: "Agents",
    desc: "코딩 에이전트·서브에이전트·오케스트레이터·MCP를 실제로 운영한 기록.",
    color: "#c9e8dc",
  },
  {
    slug: "harness",
    label: "하네스 엔지니어링",
    nav: "하네스",
    en: "Harness",
    desc: "여러 AI를 규칙·역할·검증으로 묶는 운영 구조와 거버넌스.",
    color: "#1b2440",
  },
  {
    slug: "obsidian",
    label: "Obsidian × 생성형 AI",
    nav: "Obsidian",
    en: "Obsidian",
    desc: "지식관리와 생성형 AI의 결합 — RAG·백링크·장기 기억.",
    color: "#dad3f2",
  },
  {
    slug: "local-llm",
    label: "로컬 LLM",
    nav: "로컬 LLM",
    en: "Local LLM",
    desc: "로컬에서 돌리는 모델 — 프라이버시·비용·셋업.",
    color: "#cbe3f4",
  },
  {
    slug: "startup-ai",
    label: "창업 × AI",
    nav: "창업 × AI",
    en: "Startup AI",
    desc: "신생 기업 관점에서 AI를 도구로 쓰는 법.",
    color: "#dde8ae",
  },
  {
    slug: "company-intel",
    label: "회사 인텔",
    nav: "회사 인텔",
    en: "Company Intel",
    desc: "REUEL MASION 및 산업·회사 리서치 기록.",
    color: "#f4caba",
  },
  {
    slug: "products",
    label: "제품",
    nav: "제품",
    en: "Products",
    desc: "Peek · ChannelDock 등 만들고 있는 것들.",
    color: "#f4d2dd",
  },
  {
    slug: "projects",
    label: "프로젝트",
    nav: "프로젝트",
    en: "Projects",
    desc: "직접 만든 것들 — 데스크톱앱·플러그인·웹/3D·AI 도구.",
    color: "#ead9a7",
  },
  {
    slug: "ai-interior",
    label: "AI 인테리어",
    nav: "인테리어",
    en: "AI Interior",
    desc: "AI를 활용한 공간·인테리어 실험.",
    color: "#f4e7ce",
    tag: "비주력",
  },
  {
    slug: "about",
    label: "소개",
    nav: "소개",
    en: "About",
    desc: "근성쌤은 누구이고, 이 공개 지식정원은 무엇인가.",
    color: "#c7ccd4",
  },
]
